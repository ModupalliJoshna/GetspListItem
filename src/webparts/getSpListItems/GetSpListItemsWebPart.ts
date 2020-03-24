import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from 'sp-pnp-js';

import styles from './GetSpListItemsWebPart.module.scss';
import * as strings from 'GetSpListItemsWebPartStrings';
import MockHttpClient from './MockHttpClient'; 
/*import {  
  SPHttpClient  
} from '@microsoft/sp-http'; 
import {  
  Environment,  
  EnvironmentType  
} from '@microsoft/sp-core-library';*/



export interface IGetSpListItemsWebPartProps {
  description: string;
}
export interface ISPLists {  
  value: ISPList[];  
}  
export interface ISPList {  
  EId: string;  
  Ename: string; 
  Title: number;  
 
  //Experience: string;  
  //Location: string;  
}  

export default class GetSpListItemsWebPart extends BaseClientSideWebPart <IGetSpListItemsWebPartProps> {


  /*private _getMockListData(): Promise<ISPList[]> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl).then(() => {
        const listData: ISPList[] = [
          { Title:12,EId: 'E123', Ename: 'John'},  
          { Title:12,EId: 'Etb', Ename: 'bvgc'},  
         { Title:155,EId: 'fv78', Ename: 'nhgfv'}  
            ];
        return listData;
    }) as Promise<ISPList[]>; 
}  */

private _getListData(): Promise<ISPList[]> {
  return pnp.sp.web.lists.getByTitle("second").items.get().then((response) => {
   
     return response;
   });
     
  }
  private _renderListAsync(): void {


    this._getListData()
      .then((response) => {
        this._renderList(response);
      });

  }
 private _renderList(items: ISPList[]): void {
  let html: string = '<table class="TFtable" border=1 width=100% style="border-collapse: collapse;">';
  html += `<th>Title</th><th>EId</th><th>Ename</th>`;
  items.forEach((item: ISPList) => {
    html += `
         <tr>
         <td>${item.Title}</td>
         <td>${item.EId}</td>  
         <td>${item.Ename}</td>  
         </tr>
         `;
   });
   html += `</table>`;
   const heading: Element = this.domElement.querySelector('#heading');
   const listContainer: Element = this.domElement.querySelector('#spListContainer');
   listContainer.innerHTML = html;
  }


public render(): void {  
  this.domElement.innerHTML = `  
  <div class="${styles.getSpListItems}">  
<div class="${styles.container}">  
 <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">  
   <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">  
     <span class="ms-font-xl ms-fontColor-white" style="font-size:28px">Welcome to SharePoint Framework Development</span>  
       
     <p class="ms-font-l ms-fontColor-white" style="text-align: center">Employee Details</p>  
   </div>  
 </div>  
 <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">  
   
 <br>  
<div id="spListContainer" />  
 </div>  
</div>  
</div>`;  
this._renderListAsync();  
} 

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
