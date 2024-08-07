import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackScreen from '../screens/customers/trackScreen';
import BookingScreen from '../screens/hourlydriver/bookingScreen';
import ProcessonDemandPayment from '../screens/processonDemandScreen';
import SelectYourZone from '../screens/hourlydriver/selectYourZoneScreen';
import SelectYourCity from '../screens/hourlydriver/selectYourCity';
import TermsCondition from '../screens/TermsCondition';
import HomeScreen from '../screens/homeScreen';
import BottomTabs from './bTab';
import LoginScreen from '../screens/auth/LoginScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import ThankuScreen from '../screens/customers/ThankuScreen';
import ThankyouPayment from '../screens/thankyouPaymentScreen';
import RatingAndReviewsScreen from '../screens/customers/ratingScreen';
import ResheduleRideScreen from '../screens/resheduleRideScreen';
import SplashScreen from '../screens/splashScreen';
import AcceptRideScreen from '../screens/acceptRideScreen';
import TrackDemo from '../screens/trackDemo';
import PaymentRajorpayScreen from '../screens/PaymentRajorpayScreen';
import EnquiryScreen from '../screens/footerpages/enquiryScreen';
import { OutstationDriverBookingScreen,CityOutstationDriver,ZoneOutstationScreen } from '../screens/outstationdriver';
import { MonthlyBookingScreen, MonthlyZoneScreen, MonthlyCityDriverScreen, DriverTermsScreen, MonthlyThanuScreen } from '../screens/monthlydriver';
import { WeeklyBookingScreen, WeeklyCityScreen, WeeklyConfirmDriver, WeeklyZoneScreen } from '../screens/weeklydriver';
import RatingScreen from '../screens/customers/ratingScreen';
import RatingDetail from '../screens/customers/RatingDetail';
import RatingThanks from '../screens/customers/RatingThnaks';
import RescheduleThankuScreen from '../screens/rescheduleThankyouScreen';
import WeeklyPaymentScreen from '../screens/weeklyPaymentScreen';
import FlexibleTermsCondition from '../screens/FlexibleTermsCondition';
import FlexibleThankYou from '../screens/FlexibleThankYou';
const Stack = createStackNavigator();
function AppStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="home" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentRajorpayScreen" component={PaymentRajorpayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="demo" component={TrackDemo} options={{ headerShown: false }} />
      <Stack.Screen name="enquiry" component={EnquiryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="monthlythanku" component={MonthlyThanuScreen} options={{ headerShown: false }} />
      <Stack.Screen name="weeklycity" component={WeeklyCityScreen} options={{ headerShown: false }} />
      <Stack.Screen name="weeklyzone" component={WeeklyZoneScreen} options={{ headerShown: false }} />
      <Stack.Screen name="weeklyconfirmdriver" component={WeeklyConfirmDriver} options={{ headerShown: false }} />
      <Stack.Screen name="monthlycitydriver" component={MonthlyCityDriverScreen} options={{ headerShown: false }} />
      <Stack.Screen name="monthlyzone" component={MonthlyZoneScreen} options={{ headerShown: false }} />
      <Stack.Screen name="monthlybooking" component={MonthlyBookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="zoneoutstationdriver" component={ZoneOutstationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="drivertermsscreen" component={DriverTermsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="cityoutstationdriver" component={CityOutstationDriver} options={{ headerShown: false }} />
      <Stack.Screen name="outstationbooking" component={OutstationDriverBookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="weeklybooking" component={WeeklyBookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookingConfirm" component={ThankyouPayment} options={{ headerShown: false }} />
      {/* <Stack.Screen name="thanku" component={ThankuScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="resheduleridescreen" component={ResheduleRideScreen} options={{ headerShown: false }} />
      <Stack.Screen name="otp" component={OtpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ratingandreview" component={RatingAndReviewsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="acceptride" component={AcceptRideScreen} options={{ headerShown: false }} />
      <Stack.Screen name="booking" component={BookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="payment" component={ProcessonDemandPayment} options={{ headerShown: false }} />
      <Stack.Screen name="hourlyzone" component={SelectYourZone} options={{ headerShown: false }} />
      <Stack.Screen name="track" component={TrackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="selecthourlycity" component={SelectYourCity} options={{ headerShown: false }} />
      <Stack.Screen name="termcondition" component={TermsCondition} options={{ headerShown: false }} />
      <Stack.Screen name="rateYourExperience" component={RatingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ratingDetail" component={RatingDetail} options={{ headerShown: false }} />
      <Stack.Screen name="RatingThanks" component={RatingThanks} options={{ headerShown: false }} />
      <Stack.Screen name="RescheduleThankuScreen" component={RescheduleThankuScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WeeklyPaymentScreen" component={WeeklyPaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FlexibleTermsCondition" component={FlexibleTermsCondition} options={{ headerShown: false }} />
      <Stack.Screen name="FlexibleThankYou" component={FlexibleThankYou} options={{ headerShown: false }} />
    
    
    </Stack.Navigator>
  );
}
export default AppStack;
