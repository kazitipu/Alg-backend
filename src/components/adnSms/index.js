import axios from "axios";

const api_key = "KEY-j9x5t29010ffj9utpnyux98nwsapegy5";
const api_secret = "GhhN@5swcRWuLoY@";
const baseUrl = "https://portal.adnsms.com";

export const SendSingleSms = async (mobile, message_body) => {
  const request_type = "SINGLE_SMS";
  const message_type = "TEXT";
  const response = await axios.post(`${baseUrl}/api/v1/secure/send-sms`, {
    api_key,
    api_secret,
    request_type,
    message_type,
    mobile,
    message_body,
  });
  return response;
};

export const SendOtpSms = async (mobile, message_body) => {
  const request_type = "OTP";
  const message_type = "TEXT";
  const response = await axios.post(`${baseUrl}/api/v1/secure/send-sms`, {
    api_key,
    api_secret,
    request_type,
    message_type,
    mobile,
    message_body,
  });
  return response;
};

export const SendBulkSms = async (mobile, message_body, campaign_title) => {
  const request_type = "GENERAL_CAMPAIGN";
  const message_type = "TEXT";
  const response = await axios.post(`${baseUrl}/api/v1/secure/send-sms`, {
    api_key,
    api_secret,
    request_type,
    message_type,
    mobile,
    message_body,
    isPromotional: 1,
    campaign_title,
  });
  return response;
};

export const SendMultiBodyCampaignSms = async (smsArray, campaign_title) => {
  const request_type = "MULTIBODY_CAMPAIGN";
  let data = {};
  smsArray.foreach((sms, index) => {
    if (!(sms["mobile"] && sms["message_body"])) {
      alert("Sms Array format is not correct. ");
    }
    data[`sms[${index}][mobile]`] = sms["mobile"];
    data[`sms[${index}][message_body]`] = sms["message_body"];
  });
  const message_type = "TEXT";
  const response = await axios.post(`${baseUrl}/api/v1/secure/send-sms`, {
    api_key,
    api_secret,
    request_type,
    message_type,
    ...data,
    campaign_title,
  });
  return response.api_response_code;
};
