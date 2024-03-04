import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent {
  productData!:any;
  constructor(private _menuService:MenuService,
    private _dialogref:MatDialogRef<AddMenuComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
    ){
      this.productData = {
        title: '',
        price: 0,
        image: ''
      };
  }
  ngOnInit(): void {
    if(this.data!=null){
      this.productData=this.data;
    }
    console.log(this.data)
  }

  imageUrl: string='';

  onImageChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Read the image file as a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // console.log('Image URL:', this.imageUrl);
        // this.productData.image=this.imageUrl;
      };

      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    // Handle form submission, including image upload
    if(this.data){
      // this.productData=this.data;
      // console.log(this.productData);
      
      this._menuService.updateMenu(this.data.id,this.productData).subscribe({
        next:(res)=>{
          // alert('Item Updated sucessfully...');
          this._dialogref.close();
          window.location.reload();
        },
        error:(err)=>{

        }
      })
    }
    else{
      // console.log('Form submitted:', this.productData);
    this._menuService.addMenu(this.productData).subscribe({
      next:(res)=>{
        // alert('Item Added sucessfully...');
        this._dialogref.close();
        window.location.reload();

      },
      error:(err)=>{

      }
    })
    }
}
}
