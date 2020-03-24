import { ISPList } from './GetSpListItemsWebPart';
 
export default class MockHttpClient {
   private static _items: ISPList[] = [{ Title:1234,EId: 'E123', Ename: 'John' },];
   public static get(restUrl: string, options?: any): Promise<ISPList[]> {
     return new Promise<ISPList[]>((resolve) => {
           resolve(MockHttpClient._items);
       });
   }
 }