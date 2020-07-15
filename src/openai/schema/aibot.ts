/* eslint-disable camelcase */
export interface AIBotRequestBody {
  signature: string,
  query: string,
}

export enum ANSWER_STATUS {
  FAQ = 'FAQ',
  NOMATCH = 'NOMATCH',
  CONTEXT_FAQ = 'CONTEXT_FAQ',
  GENERAL_FAQ = 'GENERAL_FAQ',
}

export interface Msg {
  ans_node_id: number;
  ans_node_name: string;
  article: string;
  confidence: number;
  content: string;
  debug_info: string;
  event: string;
  list_options: boolean;
  msg_type: string;
  opening: string;
  request_id: number;
  resp_title: string;
  scene_status: string;
  session_id: string;
  status: ANSWER_STATUS;
  take_options_only: boolean;
}

export interface AIBotRequestResponse {
  ans_node_id: number;
  ans_node_name: string;
  answer: string;
  answer_open: number;
  answer_type: string;
  article: string;
  confidence: number;
  create_time: string;
  dialog_session_status: string;
  dialog_status: string;
  event: string;
  from_user_name: string;
  intent_confirm_status: string;
  list_options: boolean;
  msg: Msg[];
  msg_id: string;
  opening: string;
  request_id: number;
  ret: number;
  scene_status: string;
  session_id: string;
  slot_info: any[];
  slots_info: any[];
  status: ANSWER_STATUS;
  take_options_only: boolean;
  title: string;
  to_user_name: string;
}
