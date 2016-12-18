import { Response }             from '@angular/http';

import { ConversionStrategy }   from './conversion-strategy';
import { Resource }             from './resource';


export class ConversionStrategyComposite implements ConversionStrategy {

  constructor(
    private conversionStrategies: ConversionStrategy[]
  ) {}

  accepts(response: Response): boolean {
    let c: ConversionStrategy = this.findFirst(response);

    return c ? true : false;
  }

  convert(response: Response): Resource {
    let c: ConversionStrategy = this.findFirst(response);

    if (c) {
      return c.convert(response);
    }

    return;
  }

  private findFirst(response: Response): ConversionStrategy {
    for (let c of this.conversionStrategies) {
      if (c.accepts(response)) {
        return c;
      }
    }
  }

}