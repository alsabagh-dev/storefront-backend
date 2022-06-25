import authenticate from './auth.service';
import { User, UserStore } from '../models/user.model';

const store = new UserStore();

describe('Auth service', () => { 
    it('should return the user if authed', async () => {
        const user: User = {
            first_name: 'first0.0.1-auth',
            last_name: 'last0.0.1-auth',
            user_name: 'user0.0.1-auth',
            password: 'pass0.0.1-auth'
        }
        
        await store.create(user);
        const result = await authenticate(user.user_name, user.password as string) as unknown as User;
        
        expect(result.user_name).toEqual(user.user_name);
    });

    it('should return null if can not find user_name', async () => {
        const user: User = {
            first_name: 'first0.0.2-auth',
            last_name: 'last0.0.2-auth',
            user_name: 'user0.0.2-auth',
            password: 'pass0.0.2-auth'
        }
        
        await store.create(user);
        const result = await authenticate('user.user_name', user.password as string) as unknown as User;
        
        expect(result).toBeNull();
    });

    it('should return null if wrong password', async () => {
        const user: User = {
            first_name: 'first0.0.3-auth',
            last_name: 'last0.0.3-auth',
            user_name: 'user0.0.3-auth',
            password: 'pass0.0.3-auth'
        }
        
        await store.create(user);
        const result = await authenticate(user.user_name, 'user.password as string') as unknown as User;
        
        expect(result).toBeNull();
    });
});
