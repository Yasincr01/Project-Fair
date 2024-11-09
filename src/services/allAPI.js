import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// register called by Auth component when user click on register button
export const registerAPI = async (reqBody)=>{
     return await commonAPI("POSt",`${SERVER_URL}/register`,reqBody)
}

// login called by auth component when user click login btn
export const loginAPI = async (reqBody)=>{
     return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// addProjectAPI called by Add component when user click add button
export const addProjectAPI = async (reqBody,reqHeader)=>{
     return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// gethomeProjectAPI called by Home component when page loaded in browser
export const getHomeProjectAPI = async ()=>{
     return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

// allProjectAPI called by project component when page is loaded in browser (useEffect)
export const allProjectAPI= async (searchKey,reqHeader)=>{
     return await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,{},reqHeader)
 }

//  userProjectAPI - called by View component when page is loaded in browser (useEffect)
export const userProjectAPI = async (reqHeader)=>{
     return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}
// updateProjectAPI called by edit component when user click update btn projects/6727929dd634c9fe14f618fc/edit
export const updateProjectAPI = async (id,reqBody,reqHeader)=>{
     return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

// userProjectRemoveAPI called by view component when user delete btn clicked
export const userProjectRemoveAPI = async (id,reqHeader)=>{
     return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

// updateUserAPI called by profile component when user click the button
export const updateUserAPI= async (reqBody,reqHeader)=>{
     return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
 }
