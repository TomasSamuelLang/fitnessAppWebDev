import User from '../model/User'

export const findUserIfAlreadyExists = async (email: String): Promise<Boolean> => {
    const result = await User.find({"email" : email});

    console.log(result);
    if (result.length > 0){
        return true;
    }
    else{
        return false;
    }
}