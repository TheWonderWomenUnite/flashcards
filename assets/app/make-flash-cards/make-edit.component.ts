import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { DeckService } from "../shared/deck.service";

@Component({
  selector: 'app-make-edit',
  templateUrl: './make-edit.component.html',
  styleUrls: ['./make-edit.component.css']
})

export class MakeEditComponent implements OnInit {
	id: string;
	deckForm: FormGroup;

	constructor(private route: ActivatedRoute,
    			private deckService: DeckService,
        		private router: Router) { }

	ngOnInit() {
  		this.route.params
  			.subscribe(
  				(params: Params) =>{
  					this.id = +params['id'];
  					// this.editMode = params['id'] != null;
  					console.log(this.editMode);
          		this.initForm();
  			}
  		);
  	}

	onSubmit() {
    	this.deckService.updateDeck(this.id, this.deckForm.value);
    	this.onCancel();
  	}

  	onCancel() {
    	this.router.navigate(['./'], {relativeTo: this.route});
  	}

  	private initForm() {
  	}	

}