import { fetchWithProxy } from './fetch';
const db = require( 'monk' )( 'localhost/wst' );
const baiduTable = db.get( 'baidu' );

const uid = '3207536240', pageSize = 24;

function getFollowUrl( page ) {
  const url = `http://pan.baidu.com/pcloud/friend/getfollowlist?query_uk=${uid}&start=${page * 24 - 1}`;
  console.log( url );
  return url;
}

function getShareUrl( page ) {

}

/**
 * 获取总的订阅数量
 */
async function getTotalCount(): Promise<number> {
  return new Promise<number>(( resolve, reject ) => {
    fetchWithProxy( getFollowUrl( 0 ), false ).then(( res ) => {
      const json = JSON.parse( res );
      resolve( json.total_count );
    }, reject );
  } );
}

/**
 * 获取订阅列表
 * @param {number} page 页
 */
async function getFollowList( page: number ) {
  return new Promise<any[]>(( resolve, reject ) => {
    fetchWithProxy( getFollowUrl( page ), false ).then(( res ) => {
      const json = JSON.parse( res );
      if ( json.errno === 0 ) {
        resolve( json.follow_list );
      } else {
        reject( res );
      }
    } )
  } );
}

async function getShareList() {

}

async function sleep( timeout ) {
  return new Promise(( resolve, reject ) => {
    setTimeout( resolve, timeout );
  } );
}



async function main() {
  const totalCount = await getTotalCount();
  for ( let i = 35; i < totalCount / pageSize; i++ ) {
    const list = await getFollowList( i );
    baiduTable.insert( list );
    await sleep( 1000 );
  }
}
main();

