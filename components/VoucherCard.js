
import React, { useState, useEffect } from 'react';
//import firebase from 'firebase';
export const VoucherCard = ({voucher,onRedeem}) => {
  


  return (
    <div className="max-w-sm w-1/5 mx-6 my-5 bg-white rounded-md overflow-hidden shadow-md">
    <div className="relative">
      <img src={voucher.imageURL} alt={voucher.name} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute bottom-0 p-4">
        <h2 className="text-white text-lg font-semibold">{voucher.name}</h2>
        <p className="mt-2 text-gray-300">{voucher.pointValue} coins</p>
      </div>
    </div>
    <div className="flex items-center justify-center px-4 py-2 bg-gray-100">
      <button className="text-sm font-medium text-gray-600 hover:text-gray-900"
      onClick={onRedeem}>
        Redeem
      </button>
    </div>
    </div>
  )
}

