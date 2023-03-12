import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { getServiceRequestUrl, isObjectEmpty } from './utils';
import { CacheService } from './cache-service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private cacheService: CacheService,
  ) {}

  async makeRequest(request): Promise<any> {
    const { method, url, body } = request;
    const serviceName = request.url.split('/')[1].split('?')[0];
    const serviceBaseUrl = this.configService.get(
      serviceName.toUpperCase() + '_URL',
    );

    if (!serviceBaseUrl) {
      throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY);
    }

    const isGetMethod = method === 'GET';

    const serviceRequestUrl = getServiceRequestUrl(
      serviceName,
      serviceBaseUrl,
      url,
    );
    const requestBody = isObjectEmpty(body) ? {} : { data: body };

    if (isGetMethod) {
      const cachedValue = this.cacheService.getCachedValue(serviceRequestUrl);

      if (cachedValue) {
        return cachedValue;
      }
    }

    const response$ = await this.httpService.request({
      method,
      url: serviceRequestUrl,
      ...requestBody,
    });

    const { data } = await firstValueFrom(response$);

    if (isGetMethod) {
      this.cacheService.addValueToCache(serviceRequestUrl, data);
    }

    return data;
  }
}
