import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { quality, format } from '@cloudinary/url-gen/actions/delivery';
import { fill, auto } from '@cloudinary/url-gen/actions/resize';
import transformation from '@cloudinary/url-gen/backwards/transformation';
import { jpg } from '@cloudinary/url-gen/qualifiers/format';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { autoRight } from '@cloudinary/url-gen/qualifiers/rotationMode';
import { image } from '@cloudinary/url-gen/qualifiers/source';
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
    private snackBar:MatSnackBar
    ){
      this.productData = {
        title: '',
        price: 0,
        image: '',
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
        this.productData.image = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    // Handle form submission, including image upload
    if(this.data){
      this._menuService.updateMenu(this.data.id,this.productData).subscribe({
        next:(res)=>{
          // alert('Item Updated sucessfully...');
          this._dialogref.close();
          window.location.reload();
        },
        error:(err)=>{
          console.log(err);
        }
      })
      this.snackBar.open('Menu Edited.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
    else{
      // console.log('Form submitted:', this.productData);
      // console.log(this.productData.image);

  // this.imageUrl=new CloudinaryImage(this.productData.image,{cloudName:'diytmaopx'})
  // .resize(
  //   fill()
  //     .width(867)
  //     .aspectRatio("1.0")
  //     .gravity(autoGravity())
  // )
  // .delivery(quality(120))
  // .delivery(format('jpg'))
  // .toURL();

  // console.log(this.imageUrl);

  // const cloudinary = new Cloudinary({
  //   cloud: {
  //     cloudName: 'diytmaopx',
  //     apiKey:'254168463285635',
  //     apiSecret:'7sJcFVTQMvqXOdzRcPJcAPrU4b8'
  //   }
  // });
  // this.imageUrl= cloudinary.image(this.productData.image).toURL();
  // console.log(this.imageUrl);
    this._menuService.addMenu(this.productData).subscribe({
      next:(res)=>{
        // alert('Item Added sucessfully...');
        this._dialogref.close();
        window.location.reload();

      },
      error:(err)=>{

      }
    })
    this.snackBar.open('New menu added.', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
    }
}
}
