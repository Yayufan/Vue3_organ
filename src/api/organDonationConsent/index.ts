import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 獲取單一器捐同意書
 * @param id 
 * @returns 
 */
export function getOrganDonationConsentApi(id): AxiosPromise {
  return request({
    url: `/organ-donation-consent/${id}`,
    method: "get",
  });
}

/**
 * 獲取全部器捐同意書
 * @returns 
 */
export function getAllOrganDonationConsentApi(): AxiosPromise {
  return request({
    url: "/organ-donation-consent",
    method: "get",
  });
}


/**
 * 獲取器捐同意書(分頁)
 * @param page 
 * @param size 
 * @returns 
 */
export function getOrganDonationConsentByPaginationApi(page, size): AxiosPromise {
  return request({
    url: "/organ-donation-consent/pagination",
    method: "get",
    params: {
      page,
      size
    }
  });
}

/**
 * 根據狀態，獲取符合的器捐同意書(分頁)
 * @param page 
 * @param size 
 * @param status
 * @returns 
 */
export function getOrganDonationConsentByPaginationByStatusApi(page, size, status): AxiosPromise {
  return request({
    url: "/organ-donation-consent/pagination-by-status",
    method: "get",
    params: {
      page,
      size,
      status
    }
  });
}

/**
 * 獲取器捐同意書總數
 * 
 * @returns 
 */
export function getOrganDonationConsentCountApi(): AxiosPromise {
  return request({
    url: "/organ-donation-consent/count",
    method: "get",
  });
}

/**
 * 根據審核狀態,獲取相符器捐同意書的總數
 * 
 * @param status 
 * @returns 
 */
export function getOrganDonationConsentCountByStatusApi(status: string): AxiosPromise {
  return request({
    url: "/organ-donation-consent/count-by-status",
    method: "get",
    params: {
      status
    }
  });
}


/**
 * 新增器捐同意書
 * @param data 
 * @returns 
 */
export function addOrganDonationConsentApi(data): AxiosPromise {
  return request({
    url: "/organ-donation-consent",
    method: "post",
    data
  });
}

/**
 * 更新器捐同意書
 * @param data 
 * @returns 
 */
export function updateOrganDonationConsentApi(data): AxiosPromise {
  return request({
    url: "/organ-donation-consent",
    method: "put",
    data
  });
}

/**
 * 批量更新器捐同意書
 * @param data 
 * @returns 
 */
export function batchUpdateOrganDonationConsentApi(data): AxiosPromise {
  return request({
    url: "/organ-donation-consent/batch",
    method: "put",
    data
  });
}





