import { faker } from '@faker-js/faker';

export function userSignUpFactory(){
    const user = userFactory();
    
    return {
        ...user,
        confirmPassword: user.password
    };

}

export function userFactory(){
    return {
        email:faker.internet.email(),
        password: faker.internet.password()
    }
}