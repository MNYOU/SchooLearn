// import {Injectable, isDevMode} from "@angular/core";
// import {map, merge, Observable, skipWhile, Subject, takeUntil} from "rxjs";
// import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
// import {ContentType} from '../enums/content-types.enums';
// import {RequestResponseType} from '../enums/reqest-response-types.enum'
// import {IRequestOptions} from "../interfaces/request-options.interface";
//
// @Injectable()
// export class HttpService {
//   /**Событие для отписки от всех запросов */
//   private _takeUntil: Subject<void> = new Subject<void>();
//
//   /**Конструктор класса */
//   constructor(
//     protected http: HttpClient
//   ) { }
//
//   /**Метод отписки от всех запросов */
//   public unsubscribeAll(): void {
//     this._takeUntil.next();
//   }
//
//   /**
//    * Обертка для запросов
//    * @param { IRequestOptions<F> requestParams параметры запроса }
//    * @return { Observable<HttpResponse<R>> } ответ
//    */
//   public request<T, F = null>(requestParams: IRequestOptions<F>): Observable<HttpResponse<T>> {
//
//     const httpOptions: {
//       /** Outgoing headers for this request. */
//       headers?: HttpHeaders;
//       /** Whether this request should be made in a way that exposes progress event. */
//       reportProgress?: boolean;
//       /** The expected response type of the server. */
//       responseType?: RequestResponseType;
//       /** Whether this request should be sent with outgoing credentials (cookies). */
//       withCredentials?: boolean;
//     } = {
//       headers: requestParams.headers || new HttpHeaders(),
//       reportProgress: false,
//       responseType: requestParams.responseType,
//       withCredentials: requestParams.withCredentials
//     };
//
//     if(!requestParams.contentType) {
//       requestParams.contentType = ContentType.json;
//     }
//
//     if (httpOptions.headers && !httpOptions.headers.has('Content-Type') && requestParams.contentType != ContentType.multipartFormData && requestParams.contentType !== ContentType.trxtXml) {
//       httpOptions.headers = httpOptions.headers.set('Content-Type', this.convertContentType(requestParams.contentType));
//     }
//
//     if (!requestParams.method) {
//       throw new Error('Не указан метод запроса');
//     }
//     if (!requestParams.body) {
//       requestParams.body = null;
//     }
//
//     const request: HttpRequest<F> = new HttpRequest<F>(requestParams.method, requestParams.url, requestParams.body, httpOptions);
//
//     return (this.http.request<T>(request) as Observable<HttpResponse<T>>)
//       .pipe(
//         skipWhile((event: HttpResponse<T>) => event.type !== HttpEventType.Response),
//         map((value: HttpResponse<T>) => {
//           if(isDevMode()) {
//             const log: any = { };
//             if(requestParams.method) {
//               log[requestParams.method.toLowerCase()] = requestParams.url;
//             }
//             log['request'] = { requestParams, httpOptions };
//             log['response'] = value;
//             console.log(log);
//           }
//           return value;
//         }),
//         takeUntil(requestParams.unsubscriber ? merge(this._takeUntil, requestParams.unsubscriber) : this._takeUntil)
//       );
//   }
//
//   /** Соответсвие ключ-значение по контент-тайпу
//    * @param { ContentType } contentType енам
//    * @return { string } Возвращает значение ключу
//    */
//   private convertContentType(contentType: ContentType): string {
//     const m: Map<ContentType, string> = new Map<ContentType, string>([
//       [ContentType.raw, ''],
//       [ContentType.json, 'application/json'],
//       [ContentType.formUrlEncoded, 'application/x-www-form-urlencoded'],
//       [ContentType.multipartFormData, 'multipart/form-data'],
//       [ContentType.text, 'text'],
//       [ContentType.blob, 'application/octet-stream'],
//       [ContentType.imageSvg, 'image/svg+xml'],
//     ]);
//     return m.get(contentType)!;
//   }
// }
