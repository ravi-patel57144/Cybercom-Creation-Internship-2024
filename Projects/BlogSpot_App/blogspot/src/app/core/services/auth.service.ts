import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.devlopment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersURL: string = environment.usersURL;
  constructor(private http: HttpClient) {
    this.initializeusers();
  }


  private initializeusers() {
    let allUsers = localStorage.getItem("allUsers");
    if (!allUsers) {
      const defaultUsers = [
        { id: 1, email: 'demo@example.com', password: 'Demo@123', userName: 'Demo User', tagLine: 'Software Engineer', github: 'https://github.com/johndoe', linkedIn: 'https://linkedin.com/in/johndoe', portfolio: 'https://johndoeportfolio.com' },
        { id: 2, email: 'jane.smith@example.com', password: 'Demo@123', userName: 'Jane Smith', tagLine: 'Web Developer', github: 'https://github.com/janesmith', linkedIn: 'https://linkedin.com/in/janesmith', portfolio: 'https://janesmithportfolio.com' },
        { id: 3, email: 'alex.wong@example.com', password: 'Demo@123', userName: 'Alex Wong', tagLine: 'UI/UX Designer', github: 'https://github.com/alexwong', linkedIn: 'https://linkedin.com/in/alexwong', portfolio: 'https://alexwongportfolio.com' },
        { id: 4, email: 'emily.johnson@example.com', password: 'Demo@123', userName: 'Emily Johnson', tagLine: 'Data Scientist', github: 'https://github.com/emilyjohnson', linkedIn: 'https://linkedin.com/in/emilyjohnson', portfolio: 'https://emilyjohnsonportfolio.com' },
        { id: 5, email: 'michael.ng@example.com', password: 'Demo@123', userName: 'Michael Ng', tagLine: 'Software Developer', github: 'https://github.com/michaelng', linkedIn: 'https://linkedin.com/in/michaelng', portfolio: 'https://michaelngportfolio.com' },
        { id: 6, email: 'sarah.brown@example.com', password: 'Demo@123', userName: 'Sarah Brown', tagLine: 'Digital Marketer', github: 'https://github.com/sarahbrown', linkedIn: 'https://linkedin.com/in/sarahbrown', portfolio: 'https://sarahbrownportfolio.com' },
        { id: 7, email: 'kevin.jones@example.com', password: 'Demo@123', userName: 'Kevin Jones', tagLine: 'Frontend Developer', github: 'https://github.com/kevinjones', linkedIn: 'https://linkedin.com/in/kevinjones', portfolio: 'https://kevinjonesportfolio.com' },
        { id: 8, email: 'lisa.chen@example.com', password: 'Demo@123', userName: 'Lisa Chen', tagLine: 'Product Manager', github: 'https://github.com/lisachen', linkedIn: 'https://linkedin.com/in/lisachen', portfolio: 'https://lisachenportfolio.com' },
        { id: 9, email: 'david.wilson@example.com', password: 'Demo@123', userName: 'David Wilson', tagLine: 'Backend Developer', github: 'https://github.com/davidwilson', linkedIn: 'https://linkedin.com/in/davidwilson', portfolio: 'https://davidwilsonportfolio.com' },
        { id: 10, email: 'laura.thomas@example.com', password: 'Demo@123', userName: 'Laura Thomas', tagLine: 'Graphic Designer', github: 'https://github.com/laurathomas', linkedIn: 'https://linkedin.com/in/laurathomas', portfolio: 'https://laurathomasportfolio.com' },
        { id: 11, email: 'adam.miller@example.com', password: 'Demo@123', userName: 'Adam Miller', tagLine: 'Full Stack Developer', github: 'https://github.com/adammiller', linkedIn: 'https://linkedin.com/in/adammiller', portfolio: 'https://adammillerportfolio.com' },
        { id: 12, email: 'natalie.white@example.com', password: 'Demo@123', userName: 'Natalie White', tagLine: 'Digital Marketing Specialist', github: 'https://github.com/nataliewhite', linkedIn: 'https://linkedin.com/in/nataliewhite', portfolio: 'https://nataliewhiteportfolio.com' },
        { id: 13, email: 'roberto.garcia@example.com', password: 'Demo@123', userName: 'Roberto Garcia', tagLine: 'Software Engineer', github: 'https://github.com/robertogarcia', linkedIn: 'https://linkedin.com/in/robertogarcia', portfolio: 'https://robertogarciaportfolio.com' },
        { id: 14, email: 'sophie.baker@example.com', password: 'Demo@123', userName: 'Sophie Baker', tagLine: 'UX/UI Designer', github: 'https://github.com/sophiebaker', linkedIn: 'https://linkedin.com/in/sophiebaker', portfolio: 'https://sophiebakerportfolio.com' },
        { id: 15, email: 'matthew.young@example.com', password: 'Demo@123', userName: 'Matthew Young', tagLine: 'Frontend Developer', github: 'https://github.com/matthewyoung', linkedIn: 'https://linkedin.com/in/matthewyoung', portfolio: 'https://matthewyoungportfolio.com' },
        { id: 16, email: 'olivia.gonzalez@example.com', password: 'Demo@123', userName: 'Olivia Gonzalez', tagLine: 'Content Creator', github: 'https://github.com/oliviagonzalez', linkedIn: 'https://linkedin.com/in/oliviagonzalez', portfolio: 'https://oliviagonzalezportfolio.com' },
        { id: 17, email: 'jacob.thompson@example.com', password: 'Demo@123', userName: 'Jacob Thompson', tagLine: 'Data Analyst', github: 'https://github.com/jacobthompson', linkedIn: 'https://linkedin.com/in/jacobthompson', portfolio: 'https://jacobthompsonportfolio.com' },
        { id: 18, email: 'isabella.hernandez@example.com', password: 'Demo@123', userName: 'Isabella Hernandez', tagLine: 'Software Engineer', github: 'https://github.com/isabellahernandez', linkedIn: 'https://linkedin.com/in/isabellahernandez', portfolio: 'https://isabellahernandezportfolio.com' },
        { id: 19, email: 'ethan.robinson@example.com', password: 'Demo@123', userName: 'Ethan Robinson', tagLine: 'Backend Developer', github: 'https://github.com/ethanrobinson', linkedIn: 'https://linkedin.com/in/ethanrobinson', portfolio: 'https://ethanrobinsonportfolio.com' },
        { id: 20, email: 'mia.adams@example.com', password: 'Demo@123', userName: 'Mia Adams', tagLine: 'Graphic Designer', github: 'https://github.com/miaadams', linkedIn: 'https://linkedin.com/in/miaadams', portfolio: 'https://miaadamsportfolio.com' }
      ];
      localStorage.setItem("allUsers", JSON.stringify(defaultUsers));
    }
  }

  fetchUsers() {

    return this.http.get(this.usersURL)

  }

  userExist(email: any, password: any) {
    let allUsers: any = localStorage.getItem("allUsers");
    allUsers = JSON.parse(allUsers);
    if (!allUsers) {
      return false;
    }

    let ind = allUsers.findIndex((ele: any) => ele.email === email && ele.password === password);

    if (ind === -1) return false;
    return allUsers[ind].id;
  }

  createUser(email: any, password: any, userName: any) {
    let allUsers: any = localStorage.getItem("allUsers");
    if (!allUsers) {
      localStorage.setItem("allUsers", JSON.stringify([]));
    }
    let res = this.userExist(email, password);

    if (res) {
      return false;
    }

    allUsers = localStorage.getItem("allUsers");
    allUsers = JSON.parse(allUsers);


    let id = Date.now();
    let obj = { "email": email, "password": password, "id": id, "userName": userName, tagLine: "", github: '', linkedIn: '', portfolio: '' };
    allUsers.push(obj);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return true;
  }
  validatePassword(password: any) {
    const minLength = 8;

    const containsUpperCase = /[A-Z]/.test(password);
    if (!containsUpperCase) {
      return "Password should have Uppercase";
    }
    const containsLowerCase = /[a-z]/.test(password);
    if (!containsLowerCase) {
      return "Password should have lowerCase";
    }
    const containsNumbers = /\d/.test(password);
    if (!containsNumbers) {
      return "Password should have Number";
    }
    const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!containsSpecialChars) {
      return "Password should have Special Character";
    }

    const isValidLength = password.length >= minLength;
    if (!isValidLength) {
      return "Password should have min 8 letters";
    }

    return "";
  }
}
