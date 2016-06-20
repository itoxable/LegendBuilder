import {beforeEachProviders, inject, it} from '@angular/core/testing';

import {TranslatePipe} from './translate.pipe';


describe('Shop TranslatePipe', () => {
  beforeEachProviders(() => [TranslatePipe]);


  it('should translate', inject([TranslatePipe], (pipe) => { expect(pipe.transform('AURA')).toBe('Area Of Effect'); }));

  it('should not translate', inject([TranslatePipe], (pipe) => {
       expect(pipe.transform(undefined)).toBe(undefined);
       expect(pipe.transform('Test')).toBe('Test');
     }));
});
