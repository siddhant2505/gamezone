import React, { useContext, useEffect,useState } from 'react'
import { db } from '@/firebase'
import { VoucherCard } from '@/components/VoucherCard';
//import { ThemeContext } from '@/contexts/ThemeContext';
import RedeemModal from '@/components/RedeemModal';
import { CoinSystem } from '@/components/CoinSystem';
//import { CoinSystem } from '@/components/CoinSystem';



const Voucher = () => {
    //const {darkMode,toggleDarkMode}=useContext(ThemeContext);
    const [vouchers, setVouchers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [vouchersPerPage, setVouchersPerPage] = useState(8);
    const [sortByCoins, setSortByCoins] = useState(false);
    const [voucher,setVoucher]=useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleRedeem = (voucher) => {
        setVoucher(voucher);
        setModalOpen(true);
      };

    useEffect(() => {
    const fetchVouchers = async () => {
    // Load vouchers from Firebase database
    const snapshot = await db.collection('vouchers').get();
    const vouchersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //setUsers(Data);
    setVouchers(vouchersList);
    };
    fetchVouchers();
});

    useEffect(() => {
    if (sortByCoins) {
      setVouchers([...vouchers].sort((a, b) => a.pointValue - b.pointValue));
    } else {
      setVouchers([...vouchers].sort((a, b) => b.pointValue - a.pointValue));
    }
  }, [sortByCoins,vouchers]);

  // Calculate index of first and last voucher on current page
    const indexOfLastVoucher = currentPage * vouchersPerPage;
    const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;

  // Select vouchers for current page
    const currentVouchers = vouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);

  // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
     };

    return (
        <>
        <div className='bg-dark-primary min-h-screen'
        // className={`${darkMode==true?'bg-light-primary':'bg-dark-primary'}`}
        >
            <CoinSystem/>
            <div className='container mx-auto my-20 bg-dark-secondary rounded-xl'>
        <div className={`text-center text-3xl pt-12 py-10 `}> VOUCHERS</div>
        {/* <CoinSystem/> */}
        <div className="flex items-center justify-center mb-4">
        <span className="mr-2">Sort by coins:   </span>
        <button
          className={`text-blue-500 px-5 ${sortByCoins ? "font-bold" : ""}`}
          onClick={() => setSortByCoins(true)}
        >
          Low to High     
        </button>
        <button
          className={`text-blue-500 ${!sortByCoins ? "font-bold" : ""}`}
          onClick={() => setSortByCoins(false)}
        >
          High to Low
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
      {currentVouchers.map((voucher) => (
        <VoucherCard voucher={voucher} id={voucher.id} onRedeem={() => handleRedeem(voucher)}/>
      ))}
        {voucher && (
      <RedeemModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} voucher={voucher} />
    )}
    </div> 
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(vouchers.length / vouchersPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 rounded-full py-1 px-3 ${
              currentPage === i + 1 ? "bg-blue-500 text-white font-bold" : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>


    </div>
    </div>
    </>
  );
}


const styles = {
  voucherList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  voucher: {
    backgroundColor: '#eee',
    padding: '20px',
    borderRadius: '10px',
    width: '45%',
    cursor: 'pointer',
  },
  selectedVoucher: {
    backgroundColor: '#ffcc00',
    padding: '20px',
    borderRadius: '10px',
  }
}

export default Voucher




