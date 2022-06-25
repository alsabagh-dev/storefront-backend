import bcrypt from 'bcrypt';
import config  from '../environment.conf';


const hash = (password: string): string => {
   return bcrypt.hashSync(
        password+(config.bcrypt_password as string),
        parseInt(config.bcrypt_password as string)
    );
}

export default hash;