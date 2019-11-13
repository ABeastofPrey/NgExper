// import { Injectable } from '@angular/core';
// import { VisionCommand } from '../models/vision-command.model';
// import { map, addIndex, compose, prop } from 'ramda';
// import { Observable, combineLatest, of } from 'rxjs';
// import { map as rxjsMap, catchError } from 'rxjs/operators';
// import { CommandOptions } from '../enums/command-type.enum';
// import { WebsocketService } from '../../../../../core/services/websocket.service';
// import { DataService, MCQueryResponse } from '../../../../../core/services';

// @Injectable()
// export class VisionCommandService {
//     constructor(private ws: WebsocketService, private ds: DataService) { }

//     public retrieveVisionCommandList(): Observable<VisionCommand[]> {
//         const queries = [
//             this.getStationAndJob(),
//             this.getVariables(),
//             this.getDimensions(),
//             this.getDataNums(),
//             this.getAsDatas(),
//             this.getStatus(),
//             this.getErrors(),
//         ];
//         return combineLatest(queries).pipe(
//             rxjsMap(([stationJob, variables, dimensions, dataNums, asDatas, statusList, errors]) => {
//                 const mapIndexed = addIndex(map);
//                 const assembleModel = (stationJob, id) => Object.assign({
//                     id,
//                     ...stationJob,
//                     dimensions, dataNums, asDatas,
//                     statusList, errors, variables,
//                     [CommandOptions.Job]: null,
//                     [CommandOptions.Dimension]: null,
//                     [CommandOptions.DataNum]: null,
//                     [CommandOptions.AsData]: null,
//                     [CommandOptions.Status]: null,
//                     [CommandOptions.Error]: null,
//                     [CommandOptions.Variable]: null,
//                     [CommandOptions.Timeout]: null,
//                 });
//                 return mapIndexed(assembleModel, stationJob);
//             })
//         );
//     }

//     public getStationAndJob(): Observable<{ [CommandOptions.Station], jobNames: string[] }[]> {
//         const api = '?VGetStationTree';
//         const getStation = (x: { stationName: string, jobs: string[] }) => Object({
//             stationName: x.stationName,
//             jobNames: [...x.jobs]
//         });
//         const parser = compose(map(getStation), prop('stations'), JSON.parse);

//         const fakeData = `{
//             "stations":	[{
//                     "stationName":	"TestStation",
//                     "jobs":	["Job_Disconnect_Test", "Job_Error_Test", "Job_FormatError_Test", "Job_OneObj_Test", "Job_SomeObj_Test", "Job_TimeOut_Test"]
//                 }, {
//                     "stationName":	"VS1",
//                     "jobs":	["JobTest1", "PositionAdjustment2D"]
//                 }, {
//                     "stationName":	"VS2",
//                     "jobs":	["PositionAdjustment2D"]
//                 }]
//         }`;
//         const fakeRes = Observable.create(observer => {
//             return observer.next({ result: fakeData });
//         });
//         return fakeRes.pipe(
//             rxjsMap((res: MCQueryResponse) => parser(res.result)),
//             catchError(err => {
//                 console.warn(`Get Station Tree failed: ${err.msg}`);
//                 return of([])
//             })
//         );

//         return this.ws.observableQuery(api).pipe(
//             rxjsMap((res: MCQueryResponse) => parser(res.result)),
//             catchError(err => {
//                 console.warn(`Get Station Tree failed: ${err.msg}`);
//                 return of([])
//             })
//         );
//     }

//     public getDimensions(): Observable<string[]> {
//         const notArrLongs = this.ds.longs.filter(x => !x.isArr);
//         const dimNamelist = map(prop('name'), notArrLongs);
//         return of(dimNamelist);
//     }

//     public getDataNums(): Observable<string[]> {
//         const notArrLongs = this.ds.longs.filter(x => !x.isArr);
//         const namelist = map(prop('name'), notArrLongs);
//         return of(namelist);
//     }

//     public getAsDatas(): Observable<string[]> {
//         const notArrLongs = this.ds.strings.filter(x => !x.isArr);
//         const namelist = map(prop('name'), notArrLongs);
//         return of(namelist);
//     }

//     public getStatus(): Observable<string[]> {
//         const notArrLongs = this.ds.strings.filter(x => !x.isArr);
//         const namelist = map(prop('name'), notArrLongs);
//         return of(namelist);
//     }

//     public getErrors(): Observable<string[]> {
//         const notArrLongs = this.ds.strings.filter(x => !x.isArr);
//         const namelist = map(prop('name'), notArrLongs);
//         return of(namelist);
//     }

//     public getVariables(): Observable<string[]> {
//         const notArrLongs = this.ds.longs.filter(x => !x.isArr);
//         const dimNamelist = map(prop('name'), notArrLongs);
//         return of(dimNamelist);
//     }
// }
