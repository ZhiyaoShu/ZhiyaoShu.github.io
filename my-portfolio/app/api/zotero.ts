import express from 'express';
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

const ZOTERO_REQUEST_TOKEN_URL = 'https://www.zotero.org/oauth/request';
const ZOTERO_ACCESS_TOKEN_URL = 'https://www.zotero.org/oauth/access';
const ZOTERO_AUTHORIZE_URL = 'https://www.zotero.org/oauth/authorize';