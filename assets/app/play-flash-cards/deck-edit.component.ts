import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { DeckService } from "../decks/deck.service";

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css']
})

export class DeckEditComponent implements OnInit {
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