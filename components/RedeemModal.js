import Modal from 'react-modal';

import React, { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { db } from "@/firebase";
import { v4 as uuidv4 } from 'uuid';


const RedeemModal=({ isOpen, closeModal, voucher })=> {
    const { user, setUser } = useContext(UserContext);
  
    const handleRedeem = async () => {
      // subtract the voucher coins from the user's coins
      const newCoins = user.coins - voucher.pointValue;
      await setUser({ ...user, coins: newCoins });
      await updateGame(-50);
      await console.log('Redeemed successfully')
      await closeModal();
    //   const emailText = `You have redeemed the ${voucher.name} voucher for ${voucher.pointValue} coins. The voucher code is ${1234}.`;
    //   sendEmail(user.email, 'Voucher Redeemed', emailText); sendE
      await alert(`Giftcard of Rs.${voucher.pointValue/5} redeemed successfully. \n Redeem code: ${uuidv4()}`)
        
      // TODO: send email with voucher details
    };
    const updateGame = async (coins)=>{
        const newUserGame = {
        userId: user.email,
        gameId: 'Redeemed',
        datePlayed: new Date(),
        score: coins
        };
    const userGamesCollection= await db.collection("userGames");
    userGamesCollection.add(newUserGame).then(docRef => {
          console.log('New voucher added with ID:', docRef.id);
        }).catch(error => {
          console.error('Error adding user game:', error);
        });

}
    return (
         <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 " style={{ maxWidth: 400, maxHeight: 500 }}>
      {/* <Modal isOpen={isOpen} onRequestClose={closeModal}> */}
        <h2 className='font-extrabold'>Redeem Voucher</h2>
        <p className='mt-5'>Do you want to redeem the {voucher.name} voucher of Rs.{voucher.pointValue/5} for {voucher.pointValue} coins?</p>
        {user.coins >= voucher.pointValue ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRedeem}>
            Get Gift Card
          </button>
        ) : (
          <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded" disabled>
            Not Enough Coins
          </button>
        )}
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 my-5" onClick={closeModal}>
          Cancel
        </button>
      </div></div>
    );
  }
  

  export default RedeemModal