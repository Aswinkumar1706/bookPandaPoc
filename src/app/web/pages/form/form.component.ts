import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { pageData } from './data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  submitted = false;

  orderForm!:FormGroup;
  AllPageData:any = pageData;
  selectedAssignment = 'essay';
  categories = this.AllPageData.categories;
  citations:any = this.AllPageData.citation.styles;
  studyLevels:any = [];
  deadline:any = [];
  sources:any = Array.from({ length: 100 }, (_, index) => index + 1);
 
  imageUrl!: any ;
  maxPages!:number;
  subTotal!:number;
  isReedemed = false;
  total!: number;
  promocode = "";
  reedemText = "Redeem"
  instructionFileList:any = [];
  instructionFileNameList:any = [];
  citationOther: any = [];
  enableRedeem:boolean = false;
  orderFormValue: any = {};
  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private elementRef: ElementRef, 
    private renderer: Renderer2
  ) { 

    this.orderForm = this.createForm();

  }

  ngOnInit(): void {
      this.init()
      this.setAllDropDown(this.selectedAssignment);
  }

  createForm (){
    return  this.fb.group({
      assignmentType: ['', [Validators.required]],
      studyLevel: ['', [Validators.required]],
      noOfPages: ['', [Validators.required]],
      deadLine: ['', [Validators.required]],
      orderInstructions: ['', [Validators.required]],
      instructionFile: [null],
      citation:['', [Validators.required]],
      source:['', [Validators.required]],
      citationStyle:[''],
    })  
  }

  // Getter method to access formcontrols
  get myOrderForm() {
    return this.orderForm.controls;
  }

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }
  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
  
    for (let i = 0; i < files.length; i++) {
      this.instructionFileList.push(files[i]);
      this.instructionFileNameList.push(this.instructionFileList[0].name)
    }

    console.log(this.instructionFileList[0].name)
  }

  changeAssignment(e:any){
      if(e.target.value){
          let selectedValue = e.target.value
          this.setAllDropDown(selectedValue);
      }
  }
  changeLevel(e:any){
    if(e.target.value){
        let selectedValue = e.target.value;
        this.setCostTotal()
    }
}
changeCitation(e:any){
  if(e.target.value){
      let selectedValue = e.target.value;
      this.citationOther = this.AllPageData.citation.other;
  }
}
changeDeadline(e:any){
  if(e.target.value){
      let selectedValue = e.target.value;
      this.setCostTotal()

  }
}

  init(){
     this.orderForm.patchValue({
      assignmentType: 'essay',
      studyLevel: 'College',
      noOfPages: 0,
      deadLine: 'd14',
      orderInstructions: "",
      instructionFile: null,
      citation:"APA7",
      source:1
     })
     setTimeout(() => {
      this.setNoOfPages('inc');
    });
    }

  setAllDropDown(assignmentType:string){
     let filterData =  this.AllPageData.types[assignmentType];
     this.studyLevels = filterData['level'];
     this.deadline = filterData['deadline'];
     this.maxPages = filterData.maxpages;
     this.updateOrderForm();
     console.log(filterData)
    this.setCostTotal();
  }

  getDealineString(){
    let stringVal = "";
    if(this.deadline){
       stringVal = this.deadline?.filter((x:any) => x.value == this.orderForm.controls['deadLine']?.value)[0].name;
    }
      
      return stringVal;
  }
  getPageString(){
    let currentPageCount = this.orderForm.controls['noOfPages'].value;
    let stringVal =  `${currentPageCount} / ${275 * currentPageCount} words`;
    return stringVal || 0
 }
  updateOrderForm(){
    let assignmentType = this.orderForm.controls['assignmentType'].value;
    let studyLevel = this.orderForm.controls['studyLevel'].value;
    let deadLine = this.orderForm.controls['deadLine'].value;
    let noOfPages = this.orderForm.controls['noOfPages'].value || 1 ;
    let currentLocalData = this.AllPageData.types[assignmentType];
    if(!currentLocalData.level.some((item: { value: any; }) => item.value === studyLevel)){
      this.orderForm.controls['studyLevel'].setValue(currentLocalData.level[0].value);
    }
    if(!currentLocalData.deadline.some((item: { value: any; }) => item.value === deadLine)){
      this.orderForm.controls['deadLine'].setValue(currentLocalData.deadline[0].value);
    }
  }

  setNoOfPages(pagecountType: string) {
    let currentPageCount = this.orderForm.controls['noOfPages'].value;
    const element = document.getElementById("nofpages") as HTMLInputElement;
  
    if (pagecountType === 'inc') {
      currentPageCount++;
    } else {
      if (currentPageCount > 1) {
        currentPageCount--;
      } else {
        return; 
      }
    }
    this.orderForm.controls['noOfPages'].setValue(currentPageCount);
    const displayValue = `${currentPageCount} / ${275 * currentPageCount} words`;
    element.value = displayValue;
    console.log(typeof currentPageCount, currentPageCount);
    this.setCostTotal();
  }

 
  

  setCostTotal(){
     let assignmentType = this.orderForm.controls['assignmentType'].value;
     let studyLevel = this.orderForm.controls['studyLevel'].value;
     let deadLine = this.orderForm.controls['deadLine'].value;
     let noOfPages = this.orderForm.controls['noOfPages'].value || 1 ;
     let currentLocalData = this.AllPageData.types[assignmentType];
     this.subTotal = currentLocalData['ppp'][deadLine][studyLevel] * noOfPages;
     if(this.isReedemed){
      this.total = this.subTotal - 5;
     }else{
      this.total = this.subTotal
     }
  }

  checkPromocode(){
    if(this.promocode && !this.isReedemed){
      this.isReedemed = true;
      this.enableRedeem = true;
      this.reedemText = "Clear";
    }else{
      this.isReedemed = false;
      this.enableRedeem = false;

      this.reedemText = "Redeem";
      this.promocode = "";
    }
   
    this.setCostTotal()
  }
  getEnable(){
    this.enableRedeem = !this.enableRedeem;
  }
  onSubmit() {
    this.submitted = true;
    if(!this.orderForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      this.orderFormValue = this.orderForm.value;
      console.log(this.orderForm.value)
      this.moveToNextTab();
      return true
    }
  }

  moveToNextTab() {
    const currentTab = this.elementRef.nativeElement.querySelector('.nav-link.active');
    const nextTab = currentTab.nextElementSibling;
  
    if (nextTab) {
      currentTab.classList.remove('active');
      nextTab.classList.add('active');
      
      const currentTabContent = this.elementRef.nativeElement.querySelector('.tab-pane.fade.active');
      const nextTabContent = this.elementRef.nativeElement.querySelector('.tab-pane.fade.active').nextElementSibling;
  
      currentTabContent.classList.remove('active', 'show');
      nextTabContent.classList.add('active', 'show');
  
      nextTab.click();
    }
  }
}
