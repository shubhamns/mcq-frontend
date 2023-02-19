// import {Route, UrlSegment, UrlSegmentGroup} from '@angular/router';

// export function caseInsensitiveMatcher(url: string) {
//   return function(
//     segments: UrlSegment[],
//     segmentGroup: UrlSegmentGroup,
//     route: Route
//   ) {
//     const matchSegments = url.split('/');
//     if (
//       matchSegments.length > segments.length ||
//       (matchSegments.length !== segments.length && route.pathMatch === 'full')
//     ) {
//       return null;
//     }

//     const consumed: UrlSegment[] = [];
//     const posParams: {[name: string]: UrlSegment} = {};
//     for (let index = 0; index < matchSegments.length; ++index) {
//       const segment = segments[index].toString().toLowerCase();
//       const matchSegment = matchSegments[index];

//       if (matchSegment.startsWith(':')) {
//         posParams[matchSegment.slice(1)] = segments[index];
//         consumed.push(segments[index]);
//       } else if (segment.toLowerCase() === matchSegment.toLowerCase()) {
//         consumed.push(segments[index]);
//       } else {
//         return null;
//       }
//     }

//     return { consumed, posParams };
//   };
// }

import { RouterModule, UrlSegment, UrlSegmentGroup, Route } from '@angular/router';

export function CaseInsensitiveMatcher(url: string) {
    url = url.toLowerCase();

    return function(
        segments: UrlSegment[],
        segmentGroup: UrlSegmentGroup,
        route: Route
    ) {
        let matchSegments = url.split('/');
        if (
            matchSegments.length > segments.length ||
            (matchSegments.length !== segments.length && route.pathMatch === 'full')
        ) {
            return null;
        }

        let consumed: UrlSegment[] = [];
        let posParams: {[name: string]: UrlSegment} = {};
        for (let index = 0; index < segments.length; ++index) {
            let segment = segments[index].toString().toLowerCase();
            let matchSegment = matchSegments[index];

            if (matchSegment.startsWith(':')) {
                posParams[matchSegment.slice(1)] = segments[index];
                consumed.push(segments[index]);
            }
            else if (segment === matchSegment) {
                consumed.push(segments[index]);
            }
            else {
                return null;
            }
        }

        return { consumed, posParams };
    }
}