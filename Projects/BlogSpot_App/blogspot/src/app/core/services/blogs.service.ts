import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  public myBehaviorSubject: any;
  public newCommentAdded: any;
  public deleteBlogIDSubject: any;
  public blogSearchKeySubject: any;

  constructor() {
    this.myBehaviorSubject = new BehaviorSubject<boolean>(false);
    this.newCommentAdded = new BehaviorSubject<boolean>(false);
    this.deleteBlogIDSubject = new BehaviorSubject<any>(-1);
    this.blogSearchKeySubject = new BehaviorSubject<any>("");
    this.initializeBlogs();
  }

  private initializeBlogs() {
    let allBlogs = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      const defaultBlogs = [
        { id: 1, title: 'UX/UI Design Trends 2024', category: 'Design', description: 'A comprehensive overview of the latest trends in UX/UI design for 2024.', userID: 2, primaryImageURL: 'https://cdn.quokkalabs.com/blog/object/20231110123631_77e78c05dff34ccdabf7e05ec324e9e0.webp', blogCreationTime: new Date().toISOString() },
        { id: 2, title: 'Data Science in Action', category: 'Technology', description: 'Real-world applications of data science and its impact on various industries.', userID: 3, primaryImageURL: 'https://www.codingal.com/resources/wp-content/uploads/2023/04/image_6_1-1536x864.png', blogCreationTime: new Date().toISOString() },
        { id: 3, title: 'The Art of Coding', category: 'Technology', description: 'Exploring the nuances of coding and software development.', userID: 1, primaryImageURL: 'https://i.pinimg.com/originals/9f/18/99/9f1899aaa853a700759bb9a4ea4a9b2f.jpg', blogCreationTime: new Date().toISOString() },
        { id: 4, title: 'Digital Marketing Strategies', category: 'Marketing', description: 'Effective strategies and techniques for digital marketing success.', userID: 4, primaryImageURL: 'https://th.bing.com/th/id/OIP.JtKt45zCNdN2xQpkHSGO8AAAAA?rs=1&pid=ImgDetMain', blogCreationTime: new Date().toISOString() },
        { id: 5, title: 'The Future of AI', category: 'Technology', description: 'Insights into the future trajectory of artificial intelligence and its implications.', userID: 5, primaryImageURL: 'https://example.com/blog5.jpg', blogCreationTime: new Date().toISOString() },
        { id: 6, title: 'Mastering Frontend Development', category: 'Technology', description: 'Tips and tricks for becoming proficient in frontend development.', userID: 6, primaryImageURL: 'https://example.com/blog6.jpg', blogCreationTime: new Date().toISOString() },
        { id: 7, title: 'Content Creation Guide', category: 'Marketing', description: 'A comprehensive guide to creating engaging content across various platforms.', userID: 7, primaryImageURL: 'https://example.com/blog7.jpg', blogCreationTime: new Date().toISOString() },
        { id: 8, title: 'Understanding Data Analytics', category: 'Technology', description: 'An introduction to data analytics and its importance in decision-making.', userID: 8, primaryImageURL: 'https://example.com/blog8.jpg', blogCreationTime: new Date().toISOString() },
        { id: 9, title: 'E-commerce Trends 2024', category: 'Business', description: 'Key trends shaping the future of e-commerce in 2024.', userID: 9, primaryImageURL: 'https://example.com/blog9.jpg', blogCreationTime: new Date().toISOString() },
        { id: 10, title: 'Graphic Design Essentials', category: 'Design', description: 'Essential principles and tools for graphic design professionals.', userID: 10, primaryImageURL: 'https://example.com/blog10.jpg', blogCreationTime: new Date().toISOString() },
        { id: 11, title: 'Web Development Best Practices', category: 'Technology', description: 'Best practices and techniques for modern web development projects.', userID: 11, primaryImageURL: 'https://example.com/blog11.jpg', blogCreationTime: new Date().toISOString() },
        { id: 12, title: 'Social Media Marketing Strategies', category: 'Marketing', description: 'Strategies for leveraging social media platforms to enhance marketing efforts.', userID: 12, primaryImageURL: 'https://example.com/blog12.jpg', blogCreationTime: new Date().toISOString() },
        { id: 13, title: 'Cybersecurity in the Digital Age', category: 'Technology', description: 'The importance of cybersecurity measures in safeguarding digital assets.', userID: 13, primaryImageURL: 'https://example.com/blog13.jpg', blogCreationTime: new Date().toISOString() },
        { id: 14, title: 'Content Management Systems Overview', category: 'Technology', description: 'An overview of popular content management systems and their features.', userID: 14, primaryImageURL: 'https://example.com/blog14.jpg', blogCreationTime: new Date().toISOString() },
        { id: 15, title: 'Email Marketing Tips', category: 'Marketing', description: 'Effective tips for running successful email marketing campaigns.', userID: 15, primaryImageURL: 'https://example.com/blog15.jpg', blogCreationTime: new Date().toISOString() },
        { id: 16, title: 'The Future of Work', category: 'Business', description: 'Exploring emerging trends and challenges in the future of work landscape.', userID: 16, primaryImageURL: 'https://example.com/blog16.jpg', blogCreationTime: new Date().toISOString() },
        { id: 17, title: 'Mobile App Development Trends', category: 'Technology', description: 'Key trends and innovations shaping the mobile app development industry.', userID: 17, primaryImageURL: 'https://example.com/blog17.jpg', blogCreationTime: new Date().toISOString() },
        { id: 18, title: 'Content Localization Strategies', category: 'Marketing', description: 'Strategies for effectively localizing content for global audiences.', userID: 18, primaryImageURL: 'https://example.com/blog18.jpg', blogCreationTime: new Date().toISOString() },
        { id: 19, title: 'Blockchain Technology Explained', category: 'Technology', description: 'An in-depth explanation of blockchain technology and its applications beyond cryptocurrency.', userID: 19, primaryImageURL: 'https://example.com/blog19.jpg', blogCreationTime: new Date().toISOString() },
        { id: 20, title: 'Brand Identity Design', category: 'Design', description: 'Key principles and practices for creating a strong brand identity through design.', userID: 20, primaryImageURL: 'https://example.com/blog20.jpg', blogCreationTime: new Date().toISOString() },
        { id: 21, title: 'SEO Strategies for 2024', category: 'Marketing', description: 'Advanced SEO strategies to boost website visibility and organic traffic.', userID: 1, primaryImageURL: 'https://example.com/blog21.jpg', blogCreationTime: new Date().toISOString() },
        { id: 22, title: 'Machine Learning Applications', category: 'Technology', description: 'Real-world applications of machine learning algorithms in various industries.', userID: 2, primaryImageURL: 'https://example.com/blog22.jpg', blogCreationTime: new Date().toISOString() },
        { id: 23, title: 'Content Marketing Trends', category: 'Marketing', description: 'Emerging trends in content marketing and strategies to stay ahead.', userID: 3, primaryImageURL: 'https://example.com/blog23.jpg', blogCreationTime: new Date().toISOString() },
        { id: 24, title: 'Responsive Web Design Principles', category: 'Design', description: 'Key principles and best practices for creating responsive web designs.', userID: 4, primaryImageURL: 'https://example.com/blog24.jpg', blogCreationTime: new Date().toISOString() },
        { id: 25, title: 'Big Data Analytics Techniques', category: 'Technology', description: 'Advanced techniques for analyzing and deriving insights from big data sets.', userID: 5, primaryImageURL: 'https://example.com/blog25.jpg', blogCreationTime: new Date().toISOString() },
        { id: 26, title: 'Social Media Engagement Strategies', category: 'Marketing', description: 'Strategies to increase engagement and interaction on social media platforms.', userID: 6, primaryImageURL: 'https://example.com/blog26.jpg', blogCreationTime: new Date().toISOString() },
        { id: 27, title: 'User Interface Design Principles', category: 'Design', description: 'Fundamental principles for creating intuitive and user-friendly interfaces.', userID: 7, primaryImageURL: 'https://example.com/blog27.jpg', blogCreationTime: new Date().toISOString() },
        { id: 28, title: 'Cloud Computing Essentials', category: 'Technology', description: 'An overview of cloud computing concepts and its role in modern IT infrastructure.', userID: 8, primaryImageURL: 'https://example.com/blog28.jpg', blogCreationTime: new Date().toISOString() },
        { id: 29, title: 'Email Automation Strategies', category: 'Marketing', description: 'Effective strategies for implementing email automation to streamline marketing campaigns.', userID: 9, primaryImageURL: 'https://example.com/blog29.jpg', blogCreationTime: new Date().toISOString() },
        { id: 30, title: 'Color Theory in Design', category: 'Design', description: 'Understanding the psychology of color and its application in design.', userID: 10, primaryImageURL: 'https://example.com/blog30.jpg', blogCreationTime: new Date().toISOString() }
      ];
      localStorage.setItem("allBlogs", JSON.stringify(defaultBlogs));
    }
  }

  createNewBlog(title: any, category: any, description: any, primaryImageURL: any) {
    let allBlogs: any = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      localStorage.setItem("allBlogs", JSON.stringify([]));

    }
    allBlogs = localStorage.getItem("allBlogs");

    allBlogs = JSON.parse(allBlogs);

    let id = Date.now();
    let userID: any = localStorage.getItem("loggedInUserID");
    userID = JSON.parse(userID);
    let obj = {
      "title": title, "category": category, "description": description, id: id, "userID": userID, "primaryImageURL": primaryImageURL,
      "blogCreationTime": id
    };
    allBlogs.push(obj);
    localStorage.setItem("allBlogs", JSON.stringify(allBlogs));

    return true;

  }

  editBlog(blogid: any, title: any, category: any, description: any, primaryImageURL: any) {
    let allBlogs: any = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      localStorage.setItem("allBlogs", JSON.stringify([]));

    }
    allBlogs = localStorage.getItem("allBlogs");

    allBlogs = JSON.parse(allBlogs);
    let obj = { "title": title, "category": category, "description": description, "primaryImageURL": primaryImageURL };
    let ind: any = allBlogs.findIndex((ele: any) => Number(ele.id) === Number(blogid));
    if (ind === -1) {
      return;
    }
    allBlogs[ind] = { ...allBlogs[ind], ...obj };
    localStorage.setItem('allBlogs', JSON.stringify(allBlogs));
  }

  getUserName(userID: any) {
    if (!userID) return "";
    userID = Number(userID);
    let allUsers: any = localStorage.getItem("allUsers");
    allUsers = JSON.parse(allUsers);
    if (!allUsers) return "";
    let ind = allUsers.findIndex((ele: any) => Number(ele.id) === userID);
    if (ind === -1) return "";
    return allUsers[ind].userName;
  }

  getUserProfile(userID: any) {
    if (!userID) return "";
    userID = Number(userID);
    let allUsers: any = localStorage.getItem("allUsers");
    allUsers = JSON.parse(allUsers);
    if (!allUsers) return "";
    let ind = allUsers.findIndex((ele: any) => Number(ele.id) === userID);
    if (ind === -1) return "";
    return allUsers[ind];
  }

  getTotalLikeCount(id: any) {
    let likeArray: any = localStorage.getItem('likeArray');
    likeArray = JSON.parse(likeArray);
    if (!likeArray) return 0;

    let ans = likeArray.reduce((acc: any, ele: any) => {
      if (Number(ele.blogID) === Number(id)) return acc + 1;
      return acc;
    }, 0)

    return ans;

  }
  getComentCount(blogID: any) {
    let commentArray: any = localStorage.getItem("commentArray");
    commentArray = JSON.parse(commentArray);
    if (!commentArray) return 0;
    let ans = commentArray.reduce((acc: any, ele: any) => {
      if (Number(ele.blogID) === Number(blogID)) return acc + 1;
      return acc;
    }, 0)
    return ans;
  }

  saveUserProfile(userObj: any, userID: any) {
    userID = Number(userID);
    let allUsers: any = localStorage.getItem("allUsers");
    allUsers = JSON.parse(allUsers);
    if (!allUsers) return "";
    let ind = allUsers.findIndex((ele: any) => Number(ele.id) === userID);
    if (ind === -1) return "";
    allUsers[ind] = { ...allUsers[ind], ...userObj };
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return "";

  }
  isBlogLiked(blogID: any, userID: any) {
    // alert( userID ) ;
    let likeArray: any = localStorage.getItem("likeArray");
    if (!likeArray) {
      localStorage.setItem("likeArray", JSON.stringify([]));
    }
    likeArray = localStorage.getItem("likeArray");
    likeArray = JSON.parse(likeArray);
    let ind = likeArray.findIndex((ele: any) => ele.blogID === blogID && ele.userID === userID);
    if (ind === -1) return false;
    return true;
  }

  likeTheBog(blogID: any, userID: any) {
    let likeArray: any = localStorage.getItem("likeArray");
    if (!likeArray) {
      localStorage.setItem("likeArray", JSON.stringify([]));
    }
    likeArray = localStorage.getItem("likeArray");
    likeArray = JSON.parse(likeArray);

    let ind = likeArray.findIndex((ele: any) => ele.blogID === blogID && ele.userID === userID);
    if (ind === -1) {
      const obj = { "blogID": blogID, "userID": userID };
      likeArray.push(obj);
      localStorage.setItem("likeArray", JSON.stringify(likeArray));
    }
  }

  dislikeTheBlog(blogID: any, userID: any) {
    let likeArray: any = localStorage.getItem("likeArray");
    if (!likeArray) {
      localStorage.setItem("likeArray", JSON.stringify([]));
    }
    likeArray = localStorage.getItem("likeArray");
    likeArray = JSON.parse(likeArray);
    likeArray = likeArray.filter((ele: any) => !(Number(ele.blogID) === blogID && Number(ele.userID) === ele.userID));
    localStorage.setItem("likeArray", JSON.stringify(likeArray));

  }
  followThePerson(followedBY: any, followedTO: any) {
    console.log(followedBY, followedTO)

    let followArray: any = localStorage.getItem("followArray");
    if (!followArray) {
      localStorage.setItem("followArray", JSON.stringify([]));
    }
    followArray = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    let ind = followArray.findIndex((ele: any) => Number(ele.followedBY) === Number(followedBY) && Number(ele.followedTO) === Number(followedTO));
    if (ind === -1) {
      const obj = { "followedBY": followedBY, "followedTO": followedTO };
      followArray.push(obj);
      localStorage.setItem("followArray", JSON.stringify(followArray));
    }
    // alert( ind ) ;
  }

  isFollowingThePerson(followedBY: any, followedTO: any) {
    let followArray: any = localStorage.getItem("followArray");
    if (!followArray) {
      localStorage.setItem("followArray", JSON.stringify([]));
    }
    followArray = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    let ind = followArray.findIndex((ele: any) => Number(ele.followedBY) === Number(followedBY) && Number(ele.followedTO) === Number(followedTO));
    if (ind === -1) return false;
    return true;
  }
  unfollowThePerson(followedBY: any, followedTO: any) {

    console.log(followedBY, followedTO)
    let followArray: any = localStorage.getItem("followArray");
    if (!followArray) {
      localStorage.setItem("followArray", JSON.stringify([]));
    }
    followArray = localStorage.getItem("followArray");
    followArray = JSON.parse(followArray);
    followArray = followArray.filter((ele: any) => !(Number(ele.followedBY) === Number(followedBY) && Number(ele.followedTO) === Number(followedTO)))

    localStorage.setItem("followArray", JSON.stringify(followArray));

  }
  addComment(message: any, userID: any, blogID: any) {
    let commentArray: any = localStorage.getItem("commentArray");
    if (!commentArray) {
      localStorage.setItem("commentArray", JSON.stringify([]));
    }
    commentArray = localStorage.getItem("commentArray");
    commentArray = JSON.parse(commentArray);
    let commentID: any = Date.now();
    let obj = { "commentID": commentID, "message": message, "blogID": blogID, "userID": userID };
    commentArray.push(obj);
    localStorage.setItem("commentArray", JSON.stringify(commentArray));


  }

  showComment() {
    this.myBehaviorSubject.next(true);
  }

  hideComment() {
    this.myBehaviorSubject.next(false);
  }

  getMyBlogs(userID: any) {
    let allBlogs: any = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      localStorage.setItem("allBlogs", JSON.stringify([]));

    }
    allBlogs = localStorage.getItem("allBlogs");

    allBlogs = JSON.parse(allBlogs);

    userID = JSON.parse(userID);
    if (!userID || !allBlogs) return [];

    allBlogs = allBlogs.filter((ele: any) => Number(ele.userID) === Number(userID));
    return allBlogs;
  }

  getUserBlog(blogID: any) {
    let allBlogs: any = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      localStorage.setItem("allBlogs", JSON.stringify([]));

    }
    allBlogs = localStorage.getItem("allBlogs");

    allBlogs = JSON.parse(allBlogs);
    let ind = allBlogs.findIndex((ele: any) => Number(ele.id) === Number(blogID));
    if (ind === -1) {
      return {};
    }
    return allBlogs[ind];



  }

  deleteMyBlog(blogID: any) {
    let allBlogs: any = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      localStorage.setItem("allBlogs", JSON.stringify([]));

    }
    allBlogs = localStorage.getItem("allBlogs");

    allBlogs = JSON.parse(allBlogs);
    allBlogs = allBlogs.filter((ele: any) => !(Number(ele.id) === Number(blogID)));
    localStorage.setItem("allBlogs", JSON.stringify(allBlogs));
  }

  calculateReadingTime(text: any) {
    const averageReadingSpeed = 200;
    const words = text.split(/\s+/);
    const numWords = words.length;
    const readingTime = Math.ceil(numWords / averageReadingSpeed);

    return readingTime;
  }

  getUserBlogs(userID: any): Blog[] {
    let allBlogs: any = localStorage.getItem("allBlogs");
    if (!allBlogs) {
      return [];
    }
    allBlogs = JSON.parse(allBlogs);
    return allBlogs.filter((blog: Blog) => blog.userID === userID);
  }

}
