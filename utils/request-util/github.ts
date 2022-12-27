import axios, { AxiosRequestConfig } from "axios";

export class GitHubHelper {
  private token: string | undefined;

  constructor() {
    this.token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  }

  private async _request(request: AxiosRequestConfig) {
    return axios({
      ...request,
      headers: {
        Authorization: `token ${this.token}`,
      },
    });
  }

  async getRepository(user: string, repo: string) {
    const response = await this._request({
      url: `https://api.github.com/repos/${user}/${repo}`,
    });
    return response.data;
  }

  async getRepositoryContributors(
    user: string,
    repo: string,
    options?: { perPage?: number; page?: number }
  ) {
    const response = await this._request({
      url: `https://api.github.com/repos/${user}/${repo}/contributors?per_page=${options?.perPage}&page=${options?.page}`,
    });
    return response.data;
  }
}
