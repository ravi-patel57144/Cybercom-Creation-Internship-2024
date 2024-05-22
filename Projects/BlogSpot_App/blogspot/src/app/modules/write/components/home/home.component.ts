import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  editor: any = "";
  html = '';
  htmlContent: any = "";
  articleToEdit: any = false;
  articleToEditID: any = "";
  entryForm: any = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    primaryImageURL: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.editor = new Editor();
    this.route.queryParams.subscribe((params: any) => {
      let userID: any = params.id;
      if (userID) {
        this.articleToEditID = userID;
        this.articleToEdit = true;

        let blogObj: any = this.blogsService.getUserBlog(this.articleToEditID);
        console.log(blogObj);

        // Splitting categories by comma and creating an array
        const categoriesArray = blogObj.category.split(',');
        this.entryForm = new FormGroup({
          title: new FormControl(blogObj.title, [Validators.required]),
          category: new FormControl(categoriesArray, [Validators.required]), // Set categories array
          description: new FormControl(blogObj.description, [Validators.required]),
          primaryImageURL: new FormControl(blogObj.primaryImageURL, [Validators.required])
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  formSubmitted() {
    if (this.entryForm.invalid) {
      alert("Please enter all the fields");
      return;
    }

    let title = this.entryForm.value.title,
      // Split the category string by comma to get individual categories
      categories = this.entryForm.value.category.split(',').map((category: string) => category.trim()),
      description = this.entryForm.value.description,
      primaryImageURL = this.entryForm.value.primaryImageURL;

    if (this.articleToEdit) {
      console.log(primaryImageURL);
      this.blogsService.editBlog(this.articleToEditID, title, categories, description, primaryImageURL);
      alert("Blog Edit posted successfully!");
    } else {
      let ans = this.blogsService.createNewBlog(title, categories, description, primaryImageURL);
      alert("Blog posted successfully!");
    }

    this.entryForm.reset();
    this.entryForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      primaryImageURL: new FormControl('', [Validators.required])
    });

    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
