import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from "@angular/material";
import {Store} from "@ngrx/store";

import { ITraining } from "../training.interface";
import { TrainingService } from "../training.service";
import * as trainingReducer from "../training.reducer";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<ITraining>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService,
              private store: Store<trainingReducer.IState>) { }

  ngOnInit() {
    this.store.select(trainingReducer.getFinishedTrainings).subscribe((trainings: ITraining[]) => {
      this.dataSource.data = trainings;
    });
    this.trainingService.getAllExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
