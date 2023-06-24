
// // /**
// //  * [이름]
// //  *    filter: // 특정 필드를 기준으로 데이터 필터
// //  *    sort: // 특정 필드로 정렬
// //  *    limit: // 가지고 오는 개수 제한
// //  *    skip: // 특정 개수 제외
// //  *    distinct: // 모든 필트 중복 제거( 한꺼번에 합쳐서 표현함)
// //  *    edges:
// //  *      node:
// //  *        children ( 필수 )
// //  *        content ( 필수 )
// //  *        [ 사용자 정의 ]
// //  *      next:
// //  *        [ 사용자 정의 ]
// //  *      previous:
// //  *        [ 사용자 정의]
// //  *    nodes:
// //  *      [ 사용자 정의]
// //  *    group:
// //  *    totalCount:
// //  *    sum
// //  */

export default {
  Query: {
    git: (root:any,_args:any,context:any) => {
      console.log(context)
      return [{"title":"testing"},{"title":"testing2"}];
    },
    nodes:(root:any,_args:any,context:any) => {

    }
  }
}