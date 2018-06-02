import { isDirectoryType, filterIsDirectoryType } from "./dirTree"
import {
  isBlogDirectoryInfo,
  getBlogPropsFilePath,
  getBlogFilePath
} from "./getBlogsInfo"
import readJsonFromFile from "../utils/readJsonFromFile"
import BLOG_PROPS_SCHEMA from "../constants/schemas/BLOG_PROPS_SCHEMA"
import { notNil } from "../utils/lodash"
import getFileNameWithoutItsExtension from "../utils/getFileNameWithoutItsExtension"
import { BlogInfo } from "../../src_old/interface/index"
import { BlogProps } from "../typings/BlogProps"
import { NAME, CREATE_TIME, TAGS, NAME_PATH, INTRODUCTION, RELATIVE_URL } from '../constants/names';
import * as FS from 'fs-extra';
import { BLOG_INTRODUCTION_CHARS_COUNT } from '../constants/numbers';
import * as PATH from 'path';
import { CLIENT_CATEGORY_RELATIVE_PATH } from '../constants/path';
const dirTree = require( "directory-tree" )


export default class UtilGetters {
  getClientCategoryJsonPath( upperDirectoryPath: string ): string {
    return PATH.resolve( upperDirectoryPath, CLIENT_CATEGORY_RELATIVE_PATH )
  }

  getBlogIntroduction( blogPath: string ) {
    const string: string = FS.readFileSync( blogPath, { encoding: 'utf8' } )
    return notNil( string ) ? string.trim().substr( 0, BLOG_INTRODUCTION_CHARS_COUNT ): ''
  }
}
