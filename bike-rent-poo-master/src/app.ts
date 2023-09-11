import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    constructor() {
        this.listUsers()
        this.listRent()
        this.listBikes()
    }

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bike: Bike, user: User, startDate: Date, endDate: Date): Rent {
        const rent = new Rent(bike, user, startDate, endDate);
        this.rents.push(rent);

        console.log(`Bike Rented:\nModel: ${bike.name}\nUser ID: ${user.id}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n`);

        return rent;
    }

    returnBike(rental: Rent, returnDate: Date): number {
        const rent = this.rents.find(r => r === rental);
        if (!rent) {
            throw new Error('Rental not found.');
        }

        if (returnDate > rent.dateTo) {
            throw new Error('Invalid return date.');
        }

        const rentalDays = (returnDate.getTime() - rent.dateFrom.getTime()) / (1000 * 60 * 60 * 24);
        const rentalCost = rentalDays * rent.bike.rate;

        console.log(`Bike Returned:\nModel: ${rent.bike.name}\nUser ID: ${rent.user.id}\nReturn Date: ${returnDate}\n`);

        return rentalCost;
    }

    listUsers(): User[] {
        const AllUsers = this.users
        console.log("Lista de Usuarios")
        console.log(AllUsers)
        return AllUsers
    }

    
    ListRent(): Rent[] {
        const AllRent = this.rents
        console.log("Lista de Reservas")
        console.log(AllRent)
        return AllRent
    }

    
    ListBikes(): Bike[] {
        const AllBikes = this.bikes
        console.log("Lista de Bikes")
        console.log(AllBikes)
        return AllBikes
    }
}