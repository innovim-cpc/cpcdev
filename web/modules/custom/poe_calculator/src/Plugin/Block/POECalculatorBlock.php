<?php

/**
 * @file
 * Contains \Drupal\poe_calculator\Plugin\Block\POECalculatorBlock.
 */

namespace Drupal\poe_calculator\Plugin\Block;
use Drupal\Core\Block\Blockbase;


/**
 * Provides a 'POE Calculator Outlook' block
 *
 * @Block(
 *  id = "poe_calculator",
 *  admin_label = @Translation("POE Calculator"),
 *  category = @Translation("POE Calculator"),
 * )
 */

class POECalculatorBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'poe_map',
      '#attached' => [
        'library' => [
          'poe_calculator/poe_calculator',
        ],
      ],
    ];

  }

}