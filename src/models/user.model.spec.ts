import { User, UserStore } from './user.model';

const store = new UserStore();

describe('user Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(store.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    it('create method should add a user', async () => {
        const user: User = {
            first_name: 'first0.0.1',
            last_name: 'last0.0.1',
            user_name: 'user0.0.1',
            password: 'pass0.0.1'
        }
        
        const result = await store.create(user);
        
        // console.log('result');
        // console.log(result);

        expect(result.first_name).toEqual(user.first_name);
        expect(result.user_name).toEqual(user.user_name);
    });

    it('index method should return a list of users', async () => {
        const user: User = {
            first_name: 'first0.0.2',
            last_name: 'last0.0.2',
            user_name: 'user0.0.2',
            password: 'pass0.0.2'
        }


        await store.create(user);

        const result = await store.index();

        expect(result.length).toBeGreaterThan(0);
        expect(result[0].user_name).toBeDefined();
    });

    it('show method should return the correct user', async () => {
        const user: User = {
            first_name: 'first0.0.3',
            last_name: 'last0.0.3',
            user_name: 'user0.0.3',
            password: 'pass0.0.3'
        }

        const insert_result = await store.create(user);
        const select_result = await store.show('' + insert_result.id);
        expect(select_result.user_name).toEqual(user.user_name);
    });

    it('show_by_user_name method should return the correct user', async () => {
        const user: User = {
            first_name: 'first0.0.4',
            last_name: 'last0.0.4',
            user_name: 'user0.0.4',
            password: 'pass0.04',
        }

        const insert_result = await store.create(user);
        const select_result = await store.show_by_user_name('' + insert_result.user_name);
        expect(select_result.first_name).toEqual(user.first_name);
    });


    it('edit method should update the correct user', async () => {
        const user: User = {
            first_name: 'first0.0.5',
            last_name: 'last0.0.5',
            user_name: 'user0.0.5',
            password: 'pass0.05',
        }
        const new_fname = 'first0.0.5-edited', new_lname = 'last0.0.5-edited';

        const insert_result = await store.create(user);
        insert_result.first_name = new_fname;
        insert_result.last_name = new_lname;

        const updated_user = await store.edit(insert_result);
        expect(updated_user.first_name).toEqual(new_fname);
        expect(updated_user.last_name.toString()).toEqual(new_lname.toString());
    });

    it('delete method should remove the user', async () => {
        const user: User = {
            first_name: 'first0.0.6',
            last_name: 'last0.0.6',
            user_name: 'user0.0.6',
            password: 'pass0.0.6',
        }
        const insert_result = await store.create(user);

        await store.delete('' + insert_result.id);

        const showed = await store.show('' + insert_result.id);
        expect(showed).toBeUndefined();
    });
});
