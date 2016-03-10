export default class MainStoreUtils {
	/**
	* Devuelve el usuario que cumpla el criterio
	*
	* @param String username
	* @param array de usuarios({username: name, newMessages: 0, active: true})
	*/
	static findUser(username, arrayUsers){
		return arrayUsers.filter(function(objUser){
			return objUser.username === username;
		})[0];
	}


	/**
	* Filtra los elementos que cumplan el criterio
	*
	* @param array username(String)
	* @param array de usuarios({username: name, newMessages: 0, active: true})
	*/
	static deleteIFdisconnected(usernames, arrayUsers){
		return arrayUsers.filter(function(objUser){
			let exists = false;
			usernames.forEach((user, index)=>{
				if(user===objUser.username) exists = true;
			});


			return exists;
		});
	}

	/**
	* Devuelve el usuario con la propiedad active
	*
	* @param array de usuarios({username: name, newMessages: 0, active: true})
	*/
	static getActiveUser(arrayUsers){
		return arrayUsers.filter((objUser)=>{
			return objUser.active
		})[0];
	}
}