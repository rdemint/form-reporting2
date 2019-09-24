import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Collection } from 'src/app/models';
import { FormControl } from '@angular/forms';
import { CollectionService } from 'src/app/services/collection.service';
import { MessageService } from 'src/app/services/message.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/user/user.service';
import { formatDate } from 'src/app/utils/format-date';
import { HttpParams } from '@angular/common/http';
import { createHttpParams } from 'src/app/utils/http-params';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnChanges {
  @Input() collection: Collection;
  @Input() selectedDate: Date;
  @Input() practiceId: number;
  // @Output() addCollectionOutput = new EventEmitter<Collection>();
  // @Output() putCollectionOutput = new EventEmitter<Collection>();

  collectionEditing = false;
  collectionDisabled = false;
  collectionForm: FormControl;
  collectionExists = false;

  constructor(
    private collectionService: CollectionService,
    private messageService: MessageService,
    private errorService: ErrorService,
    private userService: UserService) { }

  ngOnInit() {
    this.getCollections();
  }

  createForm() {
    if (this.collection !== undefined) {
      this.collectionForm = new FormControl(this.collection.amount);
      this.collectionExists = true;
      this.collectionForm.disable();
    }
    else {
      this.collectionForm = new FormControl({disabled: false});
      this.collectionExists = false;
      this.collectionForm.enable();
    }
  }

  getCollections() {
    // let year = this.selectedDate.getFullYear();
    // let month = this.selectedDate.getMonth()+1;
    // let day = this.selectedDate.getDate();
    // let httpParams = new HttpParams()
    //   .append('year', year.toString())
    //   .append('month', month.toString())
    //   .append('day', day.toString())
    //   .append('practice', this.practiceId.toString());
    let httpParams = createHttpParams(
      {
        year: this.selectedDate.getFullYear(),
        month: this.selectedDate.getMonth()+1,
        day: this.selectedDate.getDate(),
      }
    );
    this.collectionService.getCollections(httpParams)
    .subscribe((collections) => {
      this.collection = collections[0];
      this.createForm();
    });

  }

  addCollection() {
    this.collectionService.postCollection(
      {
        // submitted_by: this.userService.user['user_id'],
        practice: this.practiceId,
        amount: this.collectionForm.value,
        date: formatDate(this.selectedDate),
        last_updated: formatDate(new Date),
        submitted_on: formatDate(new Date),
      }
    )
      .subscribe(
        (resp) => {
        this.messageService.throw("Collection saved");
        this.collectionForm.disable();
      },
        (err) => {
          this.errorService.catch("Something went wrong...your collection was not saved.  Please try again later.")
        });
  }

  putCollection(collectionVal) {
    this.collectionService.putCollection(
      {
        id: this.collection.id,
        // submitted_by: this.userService.user['user_id'],
        practice: this.practiceId,
        amount: this.collectionForm.value,
        date: formatDate(this.selectedDate),
        last_updated: formatDate(new Date),
        submitted_on: formatDate(new Date),
      }
    )
    .subscribe(
      (resp) => {
      this.messageService.throw("Collection added");
      this.collectionForm.disable();
    },
      (err) => {
        this.errorService.catch("Something went wrong...your collection was not saved.  Please try again later.")
      });
  }

  editCollection() {
    this.collectionForm.enable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && changes['selectedDate'].firstChange == false) {
      this.getCollections();
      this.collectionForm.enable();
    }
  }
}
