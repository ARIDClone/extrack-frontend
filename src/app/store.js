import { configureStore } from '@reduxjs/toolkit'

import AuthSlice from '../features/Auth/AuthSlice'

import getTotalApprovePOSlice from '../features/Transaction/Dashboard/getTotalApprovePOSlice'
import getTotalRejectPOSlice from '../features/Transaction/Dashboard/getTotalRejectPOSlice'
import getTotalWaitingApprovalPOSlice from '../features/Transaction/Dashboard/getTotalWaitingApprovalPOSlice'
import getTotalApproveRFPSlice from '../features/Transaction/Dashboard/getTotalApproveRFPSlice'
import getTotalRejectRFPSlice from '../features/Transaction/Dashboard/getTotalRejectRFPSlice'
import getTotalWaitingApprovalRFPSlice from '../features/Transaction/Dashboard/getTotalWaitingApprovalRFPSlice'
import getCountrySlice from '../features/Master/Country/getCountrySlice'
import getTransactionGroupListSlice from '../features/Master/TransactionGroup/getTransactionGroupListSlice'
import getCurrencySlice from '../features/Master/Currency/getCurrencySlice'
import getCSupplierSlice from '../features/Master/CSupplier/getCSupplierSlice'
import getRequestorPPPSlice from '../features/Transaction/PPP/getRequestorPPPSlice'
import getLOBSlice from '../features/Master/LOB/getLOBSlice'
import getBrandSlice from '../features/Master/Brand/getBrandSlice'
import getYearSlice from '../features/Master/Date/getYearSlice'
import getMonthSlice from '../features/Master/Date/getMonthSlice'
import getSupplierSlice from '../features/Master/Supplier/getSupplierSlice'
import getBalancePPPSlice from '../features/Transaction/PPP/getBalancePPPSlice'
import getTransactionGroupIDSlice from '../features/Master/TransactionGroup/getTransactionGroupIDSlice'
import getPPPOnPOSlice from '../features/Transaction/PO/getPPPOnPOSlice'
import getApprovalDetailSlice from '../features/Master/Approval/getApprovalDetailSlice'
import getRateSlice from '../features/Master/Rate/getRateSlice'
import savePOSlice from '../features/Transaction/PO/savePOSlice'
import getPOSlice from '../features/Transaction/PO/getPOSlice'
import updateBalancePOSlice from '../features/Transaction/PO/updateBalancePOSlice'
import getTrackingApprovalPOSlice from '../features/Transaction/PO/getTrackingApprovalPOSlice'
import getRequestPOSlice from '../features/Transaction/PO/getRequestPOSlice'
import createPODetailSlice from '../features/Transaction/PO/createPODetailSlice'

export const store = configureStore({
  reducer: {
    getAuth: AuthSlice,

    // Dashboard
    getTotalApprovePO: getTotalApprovePOSlice,
    getTotalRejectPO: getTotalRejectPOSlice,
    getTotalWaitingApprovalPO: getTotalWaitingApprovalPOSlice,
    getTotalApproveRFP: getTotalApproveRFPSlice,
    getTotalRejectRFP: getTotalRejectRFPSlice,
    getTotalWaitingApprovalRFP: getTotalWaitingApprovalRFPSlice,

    // master
    getCountry: getCountrySlice,
    getTransactionGroupList: getTransactionGroupListSlice,
    getCurrency: getCurrencySlice,
    getCSupplier: getCSupplierSlice,
    getLOB: getLOBSlice,
    getBrand: getBrandSlice,
    getYear: getYearSlice,
    getMonth: getMonthSlice,
    getSupplier: getSupplierSlice,
    getTransactionGroupID: getTransactionGroupIDSlice,
    getApprovalDetail: getApprovalDetailSlice,
    getRate: getRateSlice,

    //transaction
    getRequestorPPP: getRequestorPPPSlice,
    getBalancePPP: getBalancePPPSlice,
    savePO: savePOSlice,
    getPO: getPOSlice,
    updateBalancePO: updateBalancePOSlice,
    getRequestPO: getRequestPOSlice,
    createPODetail: createPODetailSlice,

    //view
    getPPPonPO: getPPPOnPOSlice,
    getTrackingApprovalPO: getTrackingApprovalPOSlice,
  },
})
