import { StateCreator } from "zustand";

export type ModalState = {
   displayDeleteModal: boolean;
    //deactivatedUsers: UserProfile[];
    deleteUserId:string
    isIncreaseLimitModalVisible:boolean
    isDeleteAdminModalVisible:boolean
    deleteAdminId:string
}

export type ModalAction={
    setDisplayDeleteModal: (displayDeleteModal: boolean) => void;
   // setDeactivatedUsers: (users: UserProfile[]) => void;
   setDeleteUserId:(deleteUserId:string)=>void
   setIsIncreaseLimitModalVisible:(isIncreaseLimitModalVisible:boolean)=>void
    setIsDeleteAdminModalVisible:(isDeleteAdminModalVisible:boolean)=>void
    setDeleteAdminId:(deleteAdminId:string)=>void
}


const initialState: ModalState = {

    displayDeleteModal: false,
    deleteUserId:'',
    isIncreaseLimitModalVisible:false,
    isDeleteAdminModalVisible:false,
    deleteAdminId:''
}

export const createModalSlice: StateCreator<ModalState & ModalAction> = (set) => ({
...initialState,
   setDisplayDeleteModal: (displayDeleteModal) => set({displayDeleteModal}),
   setDeleteUserId:(deleteUserId)=>set({deleteUserId}),
    setIsIncreaseLimitModalVisible:(isIncreaseLimitModalVisible)=>set({isIncreaseLimitModalVisible}),
    setIsDeleteAdminModalVisible:(isDeleteAdminModalVisible)=>set({isDeleteAdminModalVisible}),
    setDeleteAdminId:(deleteAdminId)=>set({deleteAdminId})

})
