<?php

/**
 * @file
 * Contains \Drupal\interactive_outlooks\Plugin\Block\GlobalTropicsBlock.
 */

namespace Drupal\interactive_outlooks\Plugin\Block;
use Drupal\Core\Block\Blockbase;


class GlobalTropicsBlock extends Blockbase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    //Fetch data
    return [
      '#theme' => 'global_tropics_map',
      '#attached' => [
        'library' => [
          'interactive_outlooks/globaltropics',
        ],
      ],
    ];

  }

}
