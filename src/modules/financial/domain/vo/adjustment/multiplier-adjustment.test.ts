import { test, describe } from 'node:test'
import assert from 'node:assert'
import { Decimal } from 'decimal.js'
import { Price } from '../price'
import { Percent } from '../percent'
import { MultiplierAdjustment } from './multiplier-adjustment'

describe('MultiplierAdjustment', () => {

  test('Two digits price adjustment should works properly', () => {
    const percents = Percent.fromString('10%')

    const priceAdjustmentA = MultiplierAdjustment.fromPercentsShift(percents)
    const priceAdjustmentB = MultiplierAdjustment.fromPercentsShift(percents.negate())

    const price = Price.fromString('100.00')

    const priceA = priceAdjustmentA.applyTo(price)
    const priceB = priceAdjustmentB.applyTo(price)

    assert.equal(String(priceA), Decimal('100.00').mul('1.1').toString())
    assert.equal(String(priceB), Decimal('100.00').mul('0.9').toString())
  })

  test('Negative two digits price adjustment should works properly', () => {
    const percents = Percent.fromString('-10%')

    const priceAdjustmentA = MultiplierAdjustment.fromPercentsShift(percents)
    const priceAdjustmentB = MultiplierAdjustment.fromPercentsShift(percents.negate())

    const price = Price.fromString('100.00')

    const priceA = priceAdjustmentA.applyTo(price)
    const priceB = priceAdjustmentB.applyTo(price)

    assert.equal(String(priceA), Decimal('100.00').mul('0.9').toString())
    assert.equal(String(priceB), Decimal('100.00').mul('1.1').toString())
  })

  test('Three digits price adjustment should works properly', () => {
    const percents = Percent.fromString('125%')

    const priceAdjustmentA = MultiplierAdjustment.fromPercentsShift(percents)
    const priceAdjustmentB = MultiplierAdjustment.fromPercentsShift(percents.negate())

    const priceSourceA = Price.fromString('100.00')

    const priceA = priceAdjustmentA.applyTo(priceSourceA)

    assert.equal(String(priceA), Decimal('100.00').mul('2.25').toString())

    function getMultiplierAdjustment(this: MultiplierAdjustment) {
      return this.value
    }

    const underhoodPriceAdjustmentBMultiplier = getMultiplierAdjustment.call(priceAdjustmentB)

    assert.equal(underhoodPriceAdjustmentBMultiplier.toString(), Decimal('-1.25'))

    function calculateNegativePrice() {
      return priceAdjustmentB.applyTo(priceSourceA)
    }

    assert.throws(calculateNegativePrice)

    class AdjustableMock {
      constructor(
        public value: Decimal
      ) {
      }

      add(value: Decimal): AdjustableMock {
        return new AdjustableMock(this.value.add(value))
      }

      valueOf() {
        return this.value
      }
    }

    const priceSourceMocked = new AdjustableMock(priceSourceA.valueOf())

    const priceMocked = priceAdjustmentB.applyTo(priceSourceMocked)

    assert.equal(priceMocked.valueOf().toString(), Decimal('100.00').mul('-0.25').toString())
  })
})
