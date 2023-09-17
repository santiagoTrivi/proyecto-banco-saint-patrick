import { DataGenerator } from "../domain/interface/IDataGenerator";


export class CardNumberGenerator implements DataGenerator{

    run(): string {
        let currentDate = new Date();
  
        let year = currentDate.getFullYear().toString().slice(-4);
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let day = currentDate.getDate().toString().padStart(2, '0');
        let seconds = currentDate.getSeconds().toString().padStart(2, '0');
        let randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        
        let result = randomDigits + year + month + day + seconds;
        return result
    }
    
}