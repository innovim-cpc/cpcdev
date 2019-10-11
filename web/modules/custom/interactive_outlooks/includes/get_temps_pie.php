<?php

$coord=$_GET['coord'];
$region=$_GET['region'];
#$coord="(45.16,-117.28)";

$coord=preg_replace('/ /','',$coord);
$coord=preg_replace('/\,/',' ',$coord);
$coord=preg_replace('/\(/','',$coord);
$coord=preg_replace('/\)/','',$coord);

$lat=preg_replace('/ .*/','',$coord);
$lon=preg_replace('/.* /','',$coord);


$lat_whole=preg_replace('/\..*/','',$lat);
$lat_dec=substr($lat,0,-1);

$lon_whole=preg_replace('/\..*/','',$lon);
$lon_dec=substr($lon,0,-1);

$grep_lat_whole=",".$lat_whole;
$grep_lon_whole="^".$lon_whole;

$data_file_0="../files/".$region."/mint_".$lat_whole.".txt";
$data_file_1="../files/".$region."/maxt_".$lat_whole.".txt";
$data_file_2="../files/".$region."/temp_fcst_".$lat_whole.".txt";


$element_array=array($data_file_0,$data_file_1,$data_file_2);

$display=array();

for ($i=0;$i<sizeof($element_array);$i++)
	{
	$grep=`grep $grep_lat_whole $element_array[$i] | grep $grep_lon_whole`;

	$lines=explode("\n",$grep);

	$distance="30000";
	foreach ($lines as $line)
		{
		if (preg_match('/[0-9]/',$line))
			{
			$in_data=explode ("#",$line);
			$latlon=explode (",",$in_data[0]);
			$distance_check=distance($lat,$lon,$latlon[1],$latlon[0],"m");


			if ($distance_check <= $distance)
				{
				$distance=$distance_check;
				$out_line=$line;
				}
			}
		}

	if (preg_match('/maxt|mint/',$element_array[$i]))
		{
		$out=explode("#",$out_line);

                # Set missing value to -500
                //if (!(preg_match('/[0-9]/',$out[1])))
                if ($out[1] == 0.00)
                        {
                        $out[1]=-500;
                        }


		$elem=round($out[1]);
		$elem=preg_replace('/\..*/','',$elem);
		array_push($display,$elem);
		}
	if (preg_match('/temp_fcst/',$element_array[$i]))
		{
		$out=explode("#",$out_line);


                include_once "adjust_data.php";


		$blo=round($out[1]);
		$abv=round($out[2]);
		if ($blo <=64 && $abv <=64 && ($blo>=34 || $abv>=34))
                {
		$other=33;
              if($abv >=34)
                  {
                   $blo=(100-($other+$abv));
                  }
              if($blo >=34)
                  {
                   $abv=(100-($other+$blo));
                  }
                 }
         else {
               $other=(100-($blo+$abv));
              }

		$elem=$blo."#".$abv."#".$other;

		array_push($display,$elem);
		}
	}


if ($display[1] < $display[0]){$display[1]=$display[0];}
//print $display[0]."#".$display[1];

# display[0] = mint, display[1] = maxt
print $display[0]."#".$display[1]."#".$display[2];


#include "get_location.php";

print "#"."(".$lat.",".$lon.")";




print "#".$lat."#".$lon;

#print "Temperature = $out[0] | $temp deg F<br>lat/lon = $coord";
//print "Normal Temperature = $display[0] deg F<br>";
//print "$display[1]";
//print "Latitude/Longitude = $coord";

exit;

/////////////////////////////////////////////////////////

function distance($lat1, $lon1, $lat2, $lon2, $unit) { 

  $theta = $lon1 - $lon2; 
  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta)); 
  $dist = acos($dist); 
  $dist = rad2deg($dist); 
  $miles = $dist * 60 * 1.1515;
  $unit = strtoupper($unit);

  if ($unit == "K") {
    return ($miles * 1.609344); 
  } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
        return $miles;
      }
}

