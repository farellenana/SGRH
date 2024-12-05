import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPageFolderComponent } from './filter-page-folder.component';

describe('FilterPageFolderComponent', () => {
  let component: FilterPageFolderComponent;
  let fixture: ComponentFixture<FilterPageFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPageFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPageFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
