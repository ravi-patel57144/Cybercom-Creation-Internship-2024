import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute } from '@angular/router';
import exportFromJSON from 'export-from-json'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: any = "";
  myBlogs: any = [];
  active: boolean = true;
  editArticle: boolean = true;
  myProfile: boolean = true;
  contentLoaded: boolean = false;

  @ViewChild('inputFile') inputFile: any;

  constructor(private blogService: BlogsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let userID: any = params.id;
      let userProfile: any = this.blogService.getUserProfile(userID);
      this.username = userProfile.userName;
      this.myBlogs = this.blogService.getMyBlogs(userID);
      this.blogService.deleteBlogIDSubject.subscribe((ele: any) => {
        this.blogService.deleteMyBlog(ele);
        this.myBlogs = this.blogService.getMyBlogs(userID);
        this.contentLoaded = true;
      });
      this.myBlogs.sort((a: any, b: any) => new Date(b.blogCreationTime).getTime() - new Date(a.blogCreationTime).getTime());

      let loggedInUserID = localStorage.getItem("loggedInUserID");
      this.myProfile = Number(loggedInUserID) === Number(userID);
    });
  }

  setActive() {
    this.active = true;
  }

  setNotActive() {
    this.active = false;
  }

  exportBlogs() {
    if (this.myBlogs.length === 0) {
      alert("No blogs to export!");
      return;
    }

    let data = this.myBlogs.map((ele: any) => {
      let obj = { ...ele };
      delete obj.id;
      delete obj.userID;
      delete obj.blogCreationTime;
      obj.description = this.getParaContent(obj.description);
      return obj;
    });

    const fileName = `${this.username}_blogs_${Date.now()}`;
    const exportType = exportFromJSON.types.json;

    exportFromJSON({ data, fileName, exportType });
  }

  getParaContent(htmlString: any) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    tempElement.querySelectorAll('img').forEach(img => img.remove());
    tempElement.querySelectorAll('a').forEach(a => a.remove());
    let textContent = tempElement.textContent || tempElement.innerText;
    textContent = textContent.trim();
    return textContent;
  }

  importBlogs() {
    this.inputFile.nativeElement.click();
  }

  inputFileSubmitted() {
    let jsonInputFile = this.inputFile.nativeElement.files;
    if (jsonInputFile.length !== 1) {
      alert("Please upload only one file.");
      return;
    }
    jsonInputFile = jsonInputFile[0];
    if (jsonInputFile.type !== 'application/json') {
      alert("Please upload only JSON files.");
      return;
    }
    this.getTheJsonDataFromFile(jsonInputFile);
  }

  getTheJsonDataFromFile(jsonInputFile: any) {
    const reader = new FileReader();

    reader.onload = () => {
      let blogJSONData = JSON.parse(reader.result as string);
      this.updateUserBlogs(blogJSONData);
    };

    reader.onerror = (error) => {
      alert("Error occurred while reading the file.");
      console.error('Error occurred while reading the file:', error);
    };

    reader.readAsText(jsonInputFile);
  }

  updateUserBlogs(blogJSONData: any) {
    let blogArray: any = this.isProperJSONData(blogJSONData);
    if (!blogArray) {
      alert("Invalid JSON format!");
      return;
    }
    this.saveTheArray(blogArray);
  }

  isProperJSONData(blogJSONData: any) {
    let correctJSONData: any = true;
    let blogArray: any = [];
    let loggedInUserID: any = localStorage.getItem("loggedInUserID");
    loggedInUserID = Number(loggedInUserID);
    for (let ele of blogJSONData) {
      if (!ele.title || !ele.category || !ele.description || !ele.primaryImageURL) {
        correctJSONData = false;
        break;
      }
      let eleObj: any = { ...ele };
      eleObj.userID = loggedInUserID;
      eleObj.id = Date.now() + blogArray.length;
      eleObj.blogCreationTime = Date.now()
      blogArray.push(eleObj);
    }
    if (!correctJSONData) {
      return false;
    }
    return blogArray;
  }

  saveTheArray(blogArray: any) {
    let allBlogs: any = localStorage.getItem("allBlogs");
    allBlogs = JSON.parse(allBlogs);
    allBlogs = [...allBlogs, ...blogArray];
    localStorage.setItem("allBlogs", JSON.stringify(allBlogs));
    this.myBlogs = [...this.myBlogs, ...blogArray]; // Update displayed blogs
    alert("Blogs imported successfully!");
  }
}
