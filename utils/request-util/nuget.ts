import axios, { AxiosRequestConfig } from "axios";

export class NugetHelper {
  private async _request(request: AxiosRequestConfig) {
    return axios({
      ...request,
      baseURL: "https://api.nuget.org",
    });
  }

  async getPackageVersions(packageName: string) {
    const response = await this._request({
      url: `/v3-flatcontainer/${packageName}/index.json`,
    });
    return response.data?.versions;
  }

  async getPackageDownloads(packageName: string) {
    const response = await this._request({
      url: `https://azuresearch-usnc.nuget.org/query?q=packageid:${packageName}&prerelease=true`,
    });
    const packageInformation = response.data;
    if (packageInformation?.data?.length)
      return packageInformation.data[0].totalDownloads;
    return undefined;
  }
}
