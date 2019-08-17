import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Collection } from 'src/app/models';
import { FormControl } from '@angular/forms';
import { CollectionService } from 'src/app/services/collection.service';
import { MessageService } from 'src/app/services/message.service';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/user/user.service';
import { formatDate } from 'src/app/utils/format-date';

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
    this.getCollection()
  }

  createForm() {
    if (this.collection !== undefined) {
      this.collectionForm = new FormControl(this.collection.amount);
      this.collectionExists = true;
      this.collectionForm.disable();
    }
    else {
      this.collectionForm = new FormControl();
      this.collectionExists = false;
      this.collectionForm.enable();
    }
  }

  getCollection() {
    this.collectionService.getCollections(this.selectedDate, this.practiceId)
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
          console.log(err);
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
      this.getCollection();
    }
  }
}
