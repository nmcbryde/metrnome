<?php
  /*
   * Creates a download file for the song settings
   */
   
  $filename = sprintf( 'metronome_presets_%s.txt', date("j-n-Y") );
  header( "Content-Disposition: attachment; filename='$filename'" );

  $presets = explode(',', $_GET['json']);

  foreach ( $presets as $preset ) {
    if ( trim($preset) != "" ) echo "$preset\r\n";
  }
?>