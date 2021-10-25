import rospy
import cv2 as cv
from clover import srv
from cv_bridge import CvBridge
from sensor_msgs.msg import Image
rospy.init_node('flight')
bridge = CvBridge()
color_debug = rospy.Publisher("/color_debug", Image)
cap = False
def check_color(data):
    global cap
    frame = bridge.imgmsg_to_cv2(data, 'bgr8')[80:160, 100:220]
    hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
    red = cv.inRange(hsv, (0, 30, 30), (15, 255, 255))
    green = cv.inRange(hsv, (38, 30, 30), (86, 255, 255))
    blue = cv.inRange(hsv, (97, 30, 30), (135, 255, 255))
    yellow = cv.inRange(hsv, (28, 30, 30), (32, 255, 255))
    orange = cv.inRange(hsv, (16, 30, 30), (27, 255, 255))
    cyan = cv.inRange(hsv, (87, 30, 30), (96, 255, 255))
    violet = cv.inRange(hsv, (135, 30, 30), (162, 255, 255))
    color = {'r': cv.countNonZero(red),
             'g': cv.countNonZero(green),
             'b': cv.countNonZero(blue),
             'y': cv.countNonZero(yellow),
             'o': cv.countNonZero(orange),
             'c': cv.countNonZero(cyan),
             'v': cv.countNonZero(violet)}
    f = open('cdata.txt', 'w')
    f.write(max(color, key=color.get))
    f.close()
    image_sub.unregister()
    cap = True

image_sub = rospy.Subscriber('main_camera/image_raw', Image, check_color, queue_size=1)
while not cap:
    rospy.sleep(0.5)