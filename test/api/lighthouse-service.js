import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const lighthouseService = {
  lighthouseUrl: serviceUrl,

  async authenticate(user) {
    const response = await axios.post(`${this.lighthouseUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    console.log("Token" ,response.data.token);
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createUser(user) {
    const res = await axios.post(`${this.lighthouseUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.lighthouseUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.lighthouseUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.lighthouseUrl}/api/users`);
    return res.data;
  },


  async createGroup(group) {
    const res = await axios.post(`${this.lighthouseUrl}/api/groups`, group);
    return res.data;
  },

  async getAllGroups() {
    const res = await axios.get(`${this.lighthouseUrl}/api/groups`);
    return res.data;
  },

  async getGroup(id) {
    const res = await axios.get(`${this.lighthouseUrl}/api/groups/${id}`);
    return res.data;
  },

  async deleteGroup(id) {
    const res = await axios.delete(`${this.lighthouseUrl}/api/groups/${id}`);
    return res;
  },

  async deleteAllGroups() {
    const response = await axios.delete(`${this.lighthouseUrl}/api/groups`);
    return response.data;
  },

  async getAllLighthouses() {
    const res = await axios.get(`${this.lighthouseUrl}/api/lighthouses`);
    return res.data;
  },

  async createLighthouse(id, lighthouse) {
    const res = await axios.post(`${this.lighthouseUrl}/api/groups/${id}/lighthouses`, lighthouse);
    return res.data;
  },

  async deleteAllLighthouses() {
    const res = await axios.delete(`${this.lighthouseUrl}/api/lighthouses`);
    return res.data;
  },

  async getLighthouse(id) {
    const res = await axios.get(`${this.lighthouseUrl}/api/lighthouses/${id}`);
    return res.data;
  },

  async deleteLighthouse(id) {
    const res = await axios.delete(`${this.lighthouseUrl}/api/lighthouses/${id}`);
    return res.data;
  },

};