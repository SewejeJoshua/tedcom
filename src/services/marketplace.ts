// src/services/marketplace.ts

import axios from "axios";

import type {
  Listing,
  Category,
  CreateListingData,
} from "../components/market/types";

const BASE_URL = "https://tedcom-backend-system.onrender.com/api";

const getToken = () =>
  localStorage.getItem("access") ||
  sessionStorage.getItem("access");

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

 

// =========================
// LISTINGS
// =========================

export const getListings = async (): Promise<Listing[]> => {
  const res = await axios.get<Listing[]>(
    `${BASE_URL}/services/listings/`,
    authHeaders()
  );

  return res.data;
};

export const getListing = async (id: number): Promise<Listing> => {
  const res = await axios.get<Listing>(
    `${BASE_URL}/services/listings/${id}/`,
    authHeaders()
  );

  return res.data;
};

// =========================
// CATEGORIES
// =========================

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(
    `${BASE_URL}/services/categories/`,
    authHeaders()
  );

  return res.data;
};

export const getListingsByCategory = async (
  categoryId: number
): Promise<Listing[]> => {
  const res = await axios.get<Listing[]>(
    `${BASE_URL}/services/categories/${categoryId}/`,
    authHeaders()
  );

  return res.data;
};

// =========================
// MY LISTINGS
// =========================

export const getMyListings = async (): Promise<Listing[]> => {
  const res = await axios.get<Listing[]>(
    `${BASE_URL}/services/my-listings/`,
    authHeaders()
  );

  return res.data;
};

// =========================
// CREATE LISTING
// =========================

export const createListing = async (
  data: CreateListingData
): Promise<Listing> => {
  const res = await axios.post<Listing>(
    `${BASE_URL}/services/listings/create/`,
    data,
    authHeaders()
  );

  return res.data;
};