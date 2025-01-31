import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AdminArticleService } from '../../../admin-article.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {
  searchControl = new FormControl('');
  articles = this.adminArticlesService.articlesFromSearch;

  constructor(private adminArticlesService: AdminArticleService) {}

  ngOnInit() {
    this.adminArticlesService.onSearchInit(this.searchControl.valueChanges);
  }
}
